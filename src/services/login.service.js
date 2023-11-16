const validateSchema = require('../utils/validate.schema');
const { generateToken } = require('../utils/jwt.utils');
const { User } = require('../models');

const loginSchema = require('../schemas/login.schema');

const loginAuth = async (email, password) => {
  const validateMessage = validateSchema(loginSchema, { email, password });

  if (validateMessage) {
    return { status: 'BAD_REQUEST', data: validateMessage };
  }

  const foundUser = await User.findOne({
    where: { email, password },
    exclude: ['password'],
  });

  if (!foundUser) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }

  const token = generateToken({ payload: foundUser });

  return { status: 'SUCCESS', data: { token } };
};

module.exports = {
  loginAuth,
};