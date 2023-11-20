const { Router } = require('express');
const postsController = require('../controllers/posts.controller');
const { jwtValidate } = require('../middlewares/jwt.middleware');

const postRouter = Router();

postRouter.post('/', jwtValidate, postsController.createPost);

module.exports = postRouter;