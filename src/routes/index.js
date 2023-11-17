const Routes = require('express').Router();
const loginRouter = require('./login.route');
const userRouter = require('./user.route');
const categoriesRouter = require('./categories.route');

Routes.use('/login', loginRouter);
Routes.use('/user', userRouter);
Routes.use('/categories', categoriesRouter);

module.exports = Routes;