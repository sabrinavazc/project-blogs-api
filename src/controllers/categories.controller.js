const statusCode = require('../utils/status.code');
const categoriesService = require('../services/categories.service');

const createCategory = async (req, res) => {
  const { name } = req.body;
  
  const response = await categoriesService.createCategory(name);
  
  return res.status(statusCode(response.status)).json(response.data);
};

const listAllCategories = async (_req, res) => {
  const response = await categoriesService.listAllCategories();

  return res.status(statusCode(response.status)).json(response.data);
};

module.exports = {
  createCategory,
  listAllCategories,
};