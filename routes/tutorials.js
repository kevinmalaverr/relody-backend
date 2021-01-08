const express = require('express')
const TutorialsService = require('../services/tutorials')
const { createTutorialSchema, updateTutorialSchema, tutorialIdSchema } = require('../utils/schemas/tutorials')
const validationHandler = require('../utils/middleware/validationHandler')
const cacheResponse = require('../utils/cacheResponse')
const passport = require('passport')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

require('../utils/auth/strategies/jwt')

function tutorialsApi (app) {
  const router = express.Router()
  const tutorialsService = new TutorialsService()

  app.use('/api/tutorials', router)

  router.get(
    '/',
    async (req, res, next) => {
      cacheResponse(res, 300)
      const pageNumber = (req.query && req.query.pageNumber) || 0

      try {
        const tutorials = await tutorialsService.getTutorials({ pageNumber })
        res.status(200).json({
          data: tutorials,
          message: 'tutorials listed'
        })
      } catch (error) {
        next(error)
      }
    })

  router.get(
    '/:tutorialId',
    validationHandler({ tutorialId: tutorialIdSchema }, 'params'),
    async (req, res, next) => {
      const { tutorialId } = req.params

      try {
        const tutorial = await tutorialsService.getTutorial({ tutorialId })
        res.status(200).json({
          data: tutorial,
          message: 'tutorial returned'
        })
      } catch (error) {
        next(error)
      }
    }
  )

  router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createTutorialSchema),
    async (req, res, next) => {
      const { body: tutorial } = req
      try {
        const createdTutorialId = await tutorialsService.createTutorial({
          tutorial
        })

        res.status(201).json({
          data: createdTutorialId,
          message: 'created Tutorial'
        })
      } catch (error) {
        next(error)
      }
    }
  )

  router.put(
    '/:tutorialId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ tutorialId: tutorialIdSchema }, 'params'),
    validationHandler(updateTutorialSchema),
    async (req, res, next) => {
      cacheResponse(res, 3600)
      const { tutorialId } = req.params
      const tutorial = req.body

      try {
        const updatedTutorialId = await tutorialsService.updateTutorial({
          tutorialId,
          tutorial
        })

        res.status(200).json({
          data: updatedTutorialId,
          message: 'tutorial updated'
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.delete(
    '/:tutorialId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ tutorialId: tutorialIdSchema }, 'params'),
    async (req, res, next) => {
      const { tutorialId } = req.params

      try {
        const deletedTutorialId = await tutorialsService.deleteTutorial({
          tutorialId
        })

        res.status(200).json({
          data: deletedTutorialId,
          message: 'tutorial deleted'
        })
      } catch (err) {
        next(err)
      }
    }
  )
}

module.exports = tutorialsApi
