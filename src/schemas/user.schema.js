const Joi = require('joi');

const createUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
}).messages({
  'string.min': '"{#key}" length must be at least {#limit} characters long',
  'any.required': 'key: "{#key}" are missing',
  'string.empty': 'key: "{#key}" are missing',
  'string.email': '"{#key}" must be a valid email',
});

module.exports = { 
  createUserSchema, 
};