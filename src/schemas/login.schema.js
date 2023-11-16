const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
  'any.min': 'Invalid fields',
  'string.email': 'Invalid fields',
});

module.exports = loginSchema;