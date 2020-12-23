const mailer = require('../lib/mailer');
const { config } = require('../config');

class MailerService {
  constructor() {
    this.mailer = mailer;
  }

  registerConfirmation({ email, name, userId, secretCode }) {
    this.mailer
      .send({
        template: '../emails/emailConfirmation',
        message: {
          subject: 'Confirmación de cuenta',
          from: `"Relody cuenta 🔑" <${process.env.EMAIL_ADDRESS}>`,
          to: email,
        },
        locals: {
          name,
          activationUrl: `${config.processUrl}:${config.port}/${userId}/${secretCode}`,
        },
      })
      .then(console.log)
      .catch(console.error);
  }
}

module.exports = MailerService;
