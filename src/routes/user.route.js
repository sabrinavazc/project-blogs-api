const { Router } = require('express');
const userController = require('../controllers/user.controller');
const { jwtValidate } = require('../middlewares/jwt.middleware');

const userRouter = Router();

userRouter.get('/', jwtValidate, userController.listAllUsers);
userRouter.post('/', userController.userCreated);

module.exports = userRouter;