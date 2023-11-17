const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }

  const { dataValues } = await Category.create({ name });

  return { status: 'CREATED', data: dataValues };
};

module.exports = {
  createCategory,
};