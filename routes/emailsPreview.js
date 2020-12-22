const express = require('express');
const MailerService = require('../services/mailer');

require('../services/mailer');

function emailsPreview(app) {
  const router = express.Router();
  app.use('/emails', router);

  const mailerService = new MailerService();

  router.get('/', async (req, res, next) => {
    res.send('dff');
    mailerService.registerConfirmation({
      email: 'amalaver@unal.edu.co',
      name: 'Andres',
    });
  });
}

module.exports = emailsPreview;
