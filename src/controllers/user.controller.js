const statusCode = require('../utils/status.code');
const userService = require('../services/user.service');

const userCreated = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  const newUser = { displayName, email, password, image };
  
  const response = await userService.createUser(newUser);
  
  return res.status(statusCode(response.status)).json(response.data);
};
  
module.exports = {
  userCreated,
};