const boom = require('@hapi/boom')

function validate() {
  return false
}

function validationHandler(schema, check = "true") {
  return function (req, res, next) {
    const error = validate(req[check], schema)

    error ? next(boom.badRequest(error)) : next()
  }
}

module.exports = validationHandler