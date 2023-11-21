const { Op } = require('sequelize');
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
  const validateMessage = validateSchema(updatePostSchema, newPostData);

  if (validateMessage) return { status: 'BAD_REQUEST', data: validateMessage };

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

const deletePostsById = async (postId, userId) => {
  const post = await BlogPost.findByPk(postId);

  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
  
  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } }; 
  }

  await BlogPost.destroy({ where: { id: postId } });

  return { status: 'DELETED' };
};

const searchPost = async (query) => {
  const posts = await BlogPost.findAll({ 
    where: { 
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: 
    [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return { status: 'SUCCESS', data: posts };
}; 

module.exports = {
  createPost,
  listAllPosts,
  listPostsById,
  updatePost,
  deletePostsById,
  searchPost,
};