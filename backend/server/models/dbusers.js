'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBUsers = sequelize.define('DBUsers', {
    userId: {
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
    fullName: DataTypes.STRING,
    pictureUrl: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    userType: DataTypes.STRING, // local, facebook, google
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