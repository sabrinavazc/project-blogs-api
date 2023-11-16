const { User } = require('../models');
const validateSchema = require('../utils/validate.schema');
const { generateToken } = require('../utils/jwt.utils');
const { createUserSchema } = require('../schemas/user.schema');

const createUser = async (userObj) => {
  const validateMessage = validateSchema(createUserSchema, userObj);

  console.log(validateMessage);

  if (validateMessage) {
    return { status: 'BAD_REQUEST', data: validateMessage };
  }

  const foundUser = await User.findOne({ where: { email: userObj.email } });
  if (foundUser) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  await User.create(userObj);

  const userWithoutPassword = { ...userObj };
  delete userWithoutPassword.password;

  const token = generateToken({ payload: userWithoutPassword });

  return { status: 'CREATED', data: { token } };
};

module.exports = {
  createUser,
};