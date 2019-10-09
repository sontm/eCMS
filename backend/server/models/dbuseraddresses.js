'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBUserAddresses = sequelize.define('DBUserAddresses', {
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    address: DataTypes.TEXT,
    isDefault: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  DBUserAddresses.associate = function(models) {
    // associations can be defined here
  };
  return DBUserAddresses;
};