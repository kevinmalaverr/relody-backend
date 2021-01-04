const joi = require('@hapi/joi')

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createUserSchema = {
  name: joi.string().max(100).required(),
  email: joi.string().email().required(),

  // password validation: alhanumeric and minimum 8 characters
  password: joi.string()
    .regex(/[a-z]{1,}/)
    .regex(/[A-Z]{1,}/)
    .regex(/[0-9]{1,}/)
    .min(8)
    .required(),
  isAdmin: joi.boolean()
}

module.exports = {
  userIdSchema,
  createUserSchema
}
