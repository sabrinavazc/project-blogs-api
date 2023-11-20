const postService = require('../services/posts.service');
const statusCode = require('../utils/status.code');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;

  const response = await postService.createPost({ title, content, user, categoryIds });

  return res.status(statusCode(response.status)).json(response.data);
};

module.exports = {
  createPost,
};