const nodemailer = require('nodemailer')
const Email = require('email-templates')
const path = require('path')
const { config } = require('../config')

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  auth: {
    user: config.emailAddress,
    pass: config.emailPassword
  }
})

const mailer = new Email({
  message: {
    from: `"app@relody.com" <${config.emailAddress}>`
  },
  send: true,
  transport: transport,
  juice: true,
  juiceSettings: {
    tableElements: ['TABLE']
  },
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.resolve('emails')
    }
  }
})

module.exports = mailer
