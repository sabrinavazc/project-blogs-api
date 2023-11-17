const { Router } = require('express');
const categoryController = require('../controllers/categories.controller');
const { jwtValidate } = require('../middlewares/jwt.middleware');

const categoriesRouter = Router();

categoriesRouter.post('/', jwtValidate, categoryController.createCategory);

module.exports = categoriesRouter;