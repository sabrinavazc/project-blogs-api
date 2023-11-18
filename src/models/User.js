/* eslint-disable max-lines-per-function */
module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });
  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, {
      foreginKey: 'userId',
      as: 'blogPosts',
    });
  };

  return UserTable;
};