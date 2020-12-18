const express = require('express')
const generalTemplate = require('../email_templates/general')

function emailsPreview(app) {
  const router = express.Router()
  app.use('/emails', router)

  router.get('/', async (req, res, next) => {
    res.send(generalTemplate('holaa'))
  })
}

module.exports = emailsPreview