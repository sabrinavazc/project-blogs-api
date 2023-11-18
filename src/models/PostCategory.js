/* eslint-disable max-lines-per-function */
const PostsCategoriesTable = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false,
  });
  postsCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: postsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  
  return postsCategories;
};
  
module.exports = PostsCategoriesTable;