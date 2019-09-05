'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBProductAttributes = sequelize.define('DBProductAttributes', {
    productId: DataTypes.INTEGER,
    attributeId: DataTypes.INTEGER
  }, {});
  DBProductAttributes.associate = function(models) {
    // associations can be defined here
  };
  return DBProductAttributes;
};