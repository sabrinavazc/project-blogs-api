const { PostCategory, Category, BlogPost } = require('../models');
const validatePost = require('../utils/validate.post');

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
  
module.exports = {
  createPost,
};