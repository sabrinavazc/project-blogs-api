const Routes = require('express').Router();
const loginRouter = require('./login.route');
const userRouter = require('./user.route');

Routes.use('/login', loginRouter);
Routes.use('/user', userRouter);

module.exports = Routes;