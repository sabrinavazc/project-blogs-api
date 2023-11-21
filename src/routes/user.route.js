const { Router } = require('express');
const userController = require('../controllers/user.controller');
const { jwtValidate } = require('../middlewares/jwt.middleware');

const userRouter = Router();

userRouter.get('/:id', jwtValidate, userController.listUsersById);
userRouter.get('/', jwtValidate, userController.listAllUsers);
userRouter.post('/', userController.userCreated);
userRouter.delete('/me', jwtValidate, userController.deleteMyUser);

module.exports = userRouter;