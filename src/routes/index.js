const Routes = require('express').Router();
const loginRouter = require('./login.route');

Routes.use('/login', loginRouter);

module.exports = Routes;