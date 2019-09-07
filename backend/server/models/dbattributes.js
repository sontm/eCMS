'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBAttributes = sequelize.define('DBAttributes', {
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    attributeGroupId: DataTypes.INTEGER
  }, {});
  DBAttributes.associate = function(models) {
    // associations can be defined here
    DBAttributes.belongsToMany(models.DBProducts, {
      through: 'DBProductAttributes',
      foreignKey: 'attributeid',
      otherKey: 'productId',
      as: 'products'
    });
    DBAttributes.belongsTo(models.DBAttributeGroups, {
      foreignKey: 'attributeGroupId',
      as: 'attributeGroups'
    });
  };
  return DBAttributes;
};