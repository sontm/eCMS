'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBAttributes = sequelize.define('DBAttributes', {
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    attributeGroupId: DataTypes.INTEGER
  }, {});
  DBAttributes.associate = function(models) {
    // associations can be defined here
  };
  return DBAttributes;
};