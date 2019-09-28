'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBRoles = sequelize.define('DBRoles', {
    rolename: DataTypes.STRING
  }, {});
  DBRoles.associate = function(models) {
    // associations can be defined here
  };
  return DBRoles;
};