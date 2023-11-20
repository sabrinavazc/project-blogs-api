const { Router } = require('express');
const postsController = require('../controllers/posts.controller');
const { jwtValidate } = require('../middlewares/jwt.middleware');

const postRouter = Router();

postRouter.get('/', jwtValidate, postsController.listAllPosts);
postRouter.get('/:id', jwtValidate, postsController.listPostsById);
postRouter.post('/', jwtValidate, postsController.createPost);
postRouter.put('/:id', jwtValidate, postsController.updatePost);

module.exports = postRouter;