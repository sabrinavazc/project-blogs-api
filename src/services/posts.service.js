/* eslint-disable max-lines-per-function */
const { PostCategory, Category, BlogPost, User } = require('../models');
const validatePost = require('../utils/validate.post');
const validateSchema = require('../utils/validate.schema');
const isUserAuthorized = require('../utils/user.authorized');
const { updatePostSchema } = require('../schemas/posts.schema');

const createPost = async ({ title, content, user, categoryIds }) => {
  const validationError = validatePost({ title, content, categoryIds });
  if (validationError) {
    return validationError;
  }
  
  const { id: userId } = user;
  if (userId === undefined || userId === null) {
    return { status: 'BAD_REQUEST', data: { message: 'User ID not found or invalid' } };
  }
  // busca as categorias correspondentes aos IDs fornecidos
  const categories = await Category.findAll({ where: { id: categoryIds } }); 

  // todas as categorias foram encontradas?
  if (categories.length !== categoryIds.length) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }

  const published = Date.now();
  const updated = Date.now();

  // criando um novo post
  const newPost = await BlogPost.create({ title, content, userId, updated, published });
  const postId = newPost.id;

  // associação do post as categorias da tabela PostCategory
  await Promise.all(categoryIds.map((categoryId) => PostCategory.create({ postId, categoryId })));

  return { status: 'CREATED', data: newPost };
};

const listAllPosts = async () => {
  const posts = await BlogPost.findAll({ 
    include: 
    [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return { status: 'SUCCESS', data: posts };
};

const listPostsById = async (postId) => {
  const post = await BlogPost.findByPk(postId, { 
    include: 
      [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
        { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }

  return { status: 'SUCCESS', data: post };
};

const updatePost = async (newPostData, userId, postId) => {
  const validationError = validateSchema(updatePostSchema, newPostData);
  if (validationError) {
    return validationError;
  }
  
  // Verificar se title e content estão presentes e não são vazios
  if (!newPostData.title || newPostData.title.length === 0) {
    return { status: 400, message: 'Some required fields are missing' };
  }

  if (!isUserAuthorized(userId, postId)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }

  await BlogPost.update(newPostData, { where: { id: postId } });

  const updatedPost = await BlogPost.findByPk(postId, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, as: 'categories' },
    ],
  });

  return { status: 'SUCCESS', data: updatedPost };
};

module.exports = {
  createPost,
  listAllPosts,
  listPostsById,
  updatePost,
};