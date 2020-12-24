const express = require('express')
const passport = require('passport')
const { config } = require('../config')

// services
const ApiKeysService = require('../services/apiKeys')
const UsersService = require('../services/users')
const MailerService = require('../services/mailer')

// validation
const validationHandler = require('../utils/middleware/validationHandler')
const { createUserSchema } = require('../utils/schemas/users')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const crypto = require('crypto')
require('../utils/auth/strategies/basic')

function authApi (app) {
  const router = express.Router()
  const apiKeysService = new ApiKeysService()
  const usersService = new UsersService()
  const mailerService = new MailerService()

  app.use('/api/auth', router)

  // sign in
  router.post(
    '/sign-in',
    async function (req, res, next) {
      const { apiKeyToken } = req.body

      if (!apiKeyToken) {
        next(boom.unauthorized('apiKeyToken is required'))
      }

      passport.authenticate('basic', function (error, user) {
        try {
          if (error || !user) {
            return next(boom.unauthorized())
          }

          req.login(user, { session: false }, async function (error) {
            if (error) {
              next(error)
            }
            const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken })

            if (!apiKey) {
              return next(boom.unauthorized())
            }

            const { _id: id, name, email } = user

            const payload = {
              sub: id,
              name,
              email,
              scopes: apiKey.scopes
            }

            const token = jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' })

            return res.status(200).json({ token, user: { id, name, email } })
          })
        } catch (error) {
          next(error)
        }
      })(req, res, next)
    })

  // sign up
  router.post(
    '/sign-up',
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const user = req.body

      try {
        if (await usersService.verifyUserExists(user)) {
          return res.send({
            message: 'user already exists'
          })
        }

        const secretCode = crypto.randomBytes(16).toString('hex')
        const createdUserId = await usersService.createUser({ user: { ...user, secretCode, status: 'pending' } })

        mailerService.registerConfirmation({
          email: user.email,
          name: user.name,
          userId: createdUserId,
          secretCode
        })

        res.status(201).json({
          data: createdUserId,
          message: 'user created'
        })
      } catch (error) {
        next(error)
      }
    }
  )

  // verify account
  router.get(
    '/verify-account/:userId/:secretCode',
    async (req, res, next) => {
      const { userId, secretCode } = req.params

      try {
        const user = await usersService.getUser({ userId })
        if (secretCode === user.secretCode) {
          await usersService.changeUserStatus({ userId, status: 'active' })
          res.redirect('https://expressjs.com/es/guide/routing.html')
        }
      } catch (error) {
        next(error)
      }
    })
}

module.exports = authApi
