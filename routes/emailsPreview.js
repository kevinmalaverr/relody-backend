const express = require('express')

function emailsPreview(app) {
  const router = express.Router()
  app.use('/emails', router)

  router.get('/', async (req, res, next) => {
    res.send('holaa')
  })
}

module.exports = emailsPreview