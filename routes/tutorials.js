const express = require("express");
const TutorialsService = require("../services/tutorials");
const {
  createTutorialSchema,
  updateTutorialSchema,
  tutorialIdSchema,
} = require("../utils/schemas/tutorials");
const validationHandler = require("../utils/middleware/validationHandler");
const transporter = require("../utils/mails/transporter");
const generalTemplate = require("../email-templates/general");

function tutorialsApi(app) {
  const router = express.Router();
  app.use("/api/tutorials", router);

  const tutorialsService = new TutorialsService();

  router.get("/", async (req, res, next) => {
    const { tags } = req.query;

    try {
      await transporter.sendMail({
        from: '"verificar email 👻" <kevinmalaverr@gmail.com>', // sender address
        to: "amalaver@unal.edu.co", // list of receivers
        subject: "vericar email", // Subject line
        text: "Hello world?", // plain text body
        html: generalTemplate("confirmar cuenta"), // html body
      });

      const tutorials = await tutorialsService.getTutorials({ tags });
      res.status(200).json({
        data: tutorials,
        message: "tutorials listed",
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    "/:tutorialId",
    validationHandler({ tutorialId: tutorialIdSchema }, "params"),
    async (req, res, next) => {
      const { tutorialId } = req.params;

      try {
        const tutorial = await tutorialsService.getTutorial({ tutorialId });
        res.status(200).json({
          data: tutorial,
          message: "tutorial returned",
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/create",
    validationHandler(createTutorialSchema),
    async (req, res, next) => {
      const { body: tutorial } = req;
      try {
        const createdTutorialId = await tutorialsService.createTutorial({
          tutorial,
        });

        res.status(201).json({
          data: createdTutorialId,
          message: "created Tutorial",
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    "/:tutorialId",
    validationHandler({ tutorialId: tutorialIdSchema }, "params"),
    validationHandler(updateTutorialSchema),
    async (req, res, next) => {
      const { tutorialId } = req.params;
      const tutorial = req.body;

      try {
        const updatedTutorialId = await tutorialsService.updateTutorial({
          tutorialId,
          tutorial,
        });

        res.status(200).json({
          data: updatedTutorialId,
          message: "tutorial updated",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    "/:tutorialId",
    validationHandler({ tutorialId: tutorialIdSchema }, "params"),
    async (req, res, next) => {
      const { tutorialId } = req.params;

      try {
        const deletedTutorialId = await tutorialsService.deleteTutorial({
          tutorialId,
        });

        res.status(200).json({
          data: deletedTutorialId,
          message: "tutorial deleted",
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = tutorialsApi;
