const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string().empty().required(),
  content: Joi.string().empty().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
  'array.empty': 'one or more "categoryIds" not found',
});

module.exports = {
  createPostSchema,
};