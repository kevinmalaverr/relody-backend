const express = require('express')
const TutorialsService = require('../services/tutorials')

function tutorialsApi(app) {
  const router = express.Router()
  app.use('/api/tutorials', router)

  const tutorialsService = new TutorialsService()

  router.get('/', async (req, res, next) => {
    const { tags } = req.query

    try {
      const tutorials = await tutorialsService.getTutorials({ tags })
      res.status(200).json({
        data: tutorials,
        message: 'tutorials listed'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/create', async (req, res, next) => {
    const { body: tutorial } = req
    console.log(tutorial)
    try {
      const createdTutorialId = await tutorialsService.createTutorial({ tutorial })

      res.status(201).json({
        data: createdTutorialId,
        message: 'created Tutorial'
      })
    } catch (error) {
      next(error)
    }
  })

  router.put('/like-tutorial', async (req, res, next) => {

  })
}

module.exports = tutorialsApi