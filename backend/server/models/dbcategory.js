'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBCategory = sequelize.define('DBCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false},
    icon: DataTypes.STRING
  }, {});
  DBCategory.associate = function(models) {
    // associations can be defined here
    DBCategory.hasMany(models.DBProduct, {
      foreignKey: 'categoryId',
      as: 'productItems',
    });
  };
  return DBCategory;
};