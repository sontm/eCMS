'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBAttributeGroups = sequelize.define('DBAttributeGroups', {
    name: DataTypes.STRING
  }, {});
  DBAttributeGroups.associate = function(models) {
    // associations can be defined here
  };
  return DBAttributeGroups;
};