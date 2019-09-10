'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBCategories = sequelize.define('DBCategories', {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    order: DataTypes.SMALLINT,
    parentCategoryId: DataTypes.INTEGER
  }, {});
  DBCategories.associate = function(models) {
    // associations can be defined here
    DBCategories.hasMany(models.DBProducts, {
      foreignKey: 'firstCategoryId',
      as: 'productItems',
    });
    DBCategories.hasMany(models.DBDiscounts, {
      foreignKey: 'applyCategoryId',
      as: 'cateDiscounts',
    });
  };
  return DBCategories;
};