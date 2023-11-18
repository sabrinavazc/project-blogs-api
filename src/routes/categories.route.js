const { Router } = require('express');
const categoryController = require('../controllers/categories.controller');
const { jwtValidate } = require('../middlewares/jwt.middleware');

const categoriesRouter = Router();

categoriesRouter.get('/', jwtValidate, categoryController.listAllCategories);
categoriesRouter.post('/', jwtValidate, categoryController.createCategory);

module.exports = categoriesRouter;