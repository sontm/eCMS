'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBUsers = sequelize.define('DBUsers', {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    passwordRaw: DataTypes.STRING,
    fullName: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {});
  DBUsers.associate = function(models) {
    // associations can be defined here
    DBUsers.belongsTo(models.DBRoles, {
      foreignKey: 'roleId',
      as: 'role'
    });
  };
  return DBUsers;
};