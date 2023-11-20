/* eslint-disable max-lines-per-function */
const BlogPostTable = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false,
  });
  blogPost.associate = (models) => {
    blogPost.belongsTo(
      models.User,
      { foreignKey: 'userId', as: 'user' },
    );
  };
  return blogPost;
};
  
module.exports = BlogPostTable;