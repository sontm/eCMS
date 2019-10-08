'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBOrderItemAttributes = sequelize.define('DBOrderItemAttributes', {
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    attributeGroupName: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    orderItemId: DataTypes.INTEGER
  }, {});
  DBOrderItemAttributes.associate = function(models) {
    // associations can be defined here
  };
  return DBOrderItemAttributes;
};