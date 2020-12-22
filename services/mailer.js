const mailer = require('../lib/mailer');

class MailerService {
  constructor() {
    this.mailer = mailer;
  }

  registerConfirmation({ email, name }) {
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
        },
      })
      .catch(console.error);
  }
}

module.exports = MailerService;
