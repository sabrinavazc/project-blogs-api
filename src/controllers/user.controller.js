const statusCode = require('../utils/status.code');
const userService = require('../services/user.service');

const userCreated = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  const newUser = { displayName, email, password, image };
  
  const response = await userService.createUser(newUser);
  
  return res.status(statusCode(response.status)).json(response.data);
};

const listAllUsers = async (_req, res) => {
  const response = await userService.listAllUsers();

  return res.status(statusCode(response.status)).json(response.data);
};

const listUsersById = async (req, res) => {
  const { id } = req.params;
  
  const response = await userService.listUsersById(id);

  return res.status(statusCode(response.status)).json(response.data);
};

const deleteMyUser = async (req, res) => {
  const userId = Number(req.user.id);

  const response = await userService.deleteMyUser(userId);

  return res.status(statusCode(response.status)).json(response.data);
};
  
module.exports = {
  userCreated,
  listAllUsers,
  listUsersById,
  deleteMyUser,
};