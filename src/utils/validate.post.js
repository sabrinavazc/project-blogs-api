const { createPostSchema } = require('../schemas/posts.schema');

const validatePost = (data) => {
  const { error } = createPostSchema.validate(data);
  if (error) {
    const { details } = error;
    const message = details.map((item) => item.message).join(', ');
    return { status: 'BAD_REQUEST', data: { message } };
  }
  return null;
};

module.exports = validatePost;