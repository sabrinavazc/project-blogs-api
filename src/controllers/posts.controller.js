const postService = require('../services/posts.service');
const statusCode = require('../utils/status.code');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;

  const response = await postService.createPost({ title, content, user, categoryIds });

  return res.status(statusCode(response.status)).json(response.data);
};

const listAllPosts = async (_req, res) => {
  const serviceResponse = await postService.listAllPosts();

  return res.status(statusCode(serviceResponse.status)).json(serviceResponse.data);
};

const listPostsById = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await postService.listPostsById(id);

  return res.status(statusCode(serviceResponse.status)).json(serviceResponse.data);
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  const { title, content } = req.body;

  const newPostData = { title, content };

  const response = await postService.updatePost(newPostData, userId, postId);

  return res.status(statusCode(response.status)).json(response.data);
};

module.exports = {
  createPost,
  listAllPosts,
  listPostsById,
  updatePost,
};