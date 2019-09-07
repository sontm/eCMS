'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBAttributeGroups = sequelize.define('DBAttributeGroups', {
    name: DataTypes.STRING
  }, {});
  DBAttributeGroups.associate = function(models) {
    // associations can be defined here
    DBAttributeGroups.hasMany(models.DBAttributes, {
      foreignKey: 'attributeGroupId',
      as: 'attributeItems',
    });
  };
  return DBAttributeGroups;
};