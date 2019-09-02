'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBProduct = sequelize.define('DBProduct', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true},
    price: DataTypes.FLOAT
  }, {});
  DBProduct.associate = function(models) {
    // associations can be defined here
    DBProduct.belongsTo(models.DBCategory, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };
  return DBProduct;
};