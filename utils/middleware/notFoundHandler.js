const boom = require('@hapi/boom')
const { func } = require('@hapi/joi')

function notFoundHandler(req, res) {
  const { output: { statusCode, payload } } = boom.notFound()

  res.status(statusCode).json(payload)
}

module.exports = notFoundHandler