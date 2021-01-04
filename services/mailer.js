const mailer = require('../lib/mailer')
const { config } = require('../config')

class MailerService {
  constructor () {
    this.mailer = mailer
  }

  registerConfirmation ({ email, name, userId, secretCode }) {
    this.mailer
      .send({
        template: '../emails/emailConfirmation',
        message: {
          subject: 'Confirmación de cuenta',
          from: `"Relody cuenta" <${config.emailAddress}>`,
          to: email
        },
        locals: {
          name,
          activationUrl: `${config.frontendUrl}/verify-account/${userId}/${secretCode}`
        }
      })
      .then()
      .catch(console.error)
  }
}

module.exports = MailerService
