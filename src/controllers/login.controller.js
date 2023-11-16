const loginServices = require('../services/login.service');
const statusCode = require('../utils/status.code');

const loginAuth = async (req, res) => {
  const { email, password } = req.body;

  const serviceResponse = await loginServices.loginAuth(email, password);

  return res.status(statusCode(serviceResponse.status)).json(serviceResponse.data);
};

module.exports = {
  loginAuth,
};