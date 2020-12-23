const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailer = new Email({
  message: {
    from: `"app@relody.com" <${process.env.EMAIL_ADDRESS}>`,
  },
  send: true,
  transport: transport,
  juice: true,
  juiceSettings: {
    tableElements: ['TABLE'],
  },
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.resolve('emails'),
    },
  },
});

module.exports = mailer;
