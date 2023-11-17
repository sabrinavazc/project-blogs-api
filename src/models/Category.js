module.exports = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define('Category', { 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  }, {
      
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  });
   
  return CategoryTable;
};