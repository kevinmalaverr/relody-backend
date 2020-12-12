const express = require('express')
const TutorialsService = require('../services/tutorials')
const { createTutorialSchema, updateTutorialSchema, tutorialIdSchema } = require('../utils/schemas/tutorials')
const validationHandler = require('../utils/middleware/validationHandler')

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

  router.get(
    '/:tutorialId',
    validationHandler({ tutorialId: tutorialIdSchema }, 'params'),
    async (req, res, next) => {
      const { tutorialId } = req.params

      try {

      } catch (error) {
        next(error)
      }
    })

  router.post(
    '/create',
    validationHandler(createTutorialSchema),
    async (req, res, next) => {
      const { body: tutorial } = req
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

  router.put(
    '/:tutorialId',
    validationHandler({ tutorialId: tutorialIdSchema }, 'params'),
    validationHandler(updateTutorialSchema),
    async (req, res, next) => {
      const { tutorialId } = req.params;
      const { body: tutorial } = req;

      try {
        const updatedTutorialId = await tutorialsService.updateTutorial({
          tutorialId,
          tutorial
        });

        res.status(200).json({
          data: updatedTutorialId,
          message: 'tutorial updated'
        });
      } catch (err) {
        next(err);
      }
    })

  router.delete(
    '/:movieId',
    validationHandler({ tutorialId: tutorialIdSchema }, 'params'),
    async (req, res, next) => {
      const { tutorialId } = req.params;

      try {
        const deletedTutorialId = await tutorialsService.deleteTutorial({ tutorialId });

        res.status(200).json({
          data: deletedMovieId,
          message: 'tutorial deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = tutorialsApi