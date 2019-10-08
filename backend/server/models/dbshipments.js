'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBShipments = sequelize.define('DBShipments', {
    orderId: DataTypes.INTEGER,
    trackingNumber: DataTypes.STRING,
    receiveName: DataTypes.STRING,
    receivePhone: DataTypes.STRING,
    receivePhone2: DataTypes.STRING,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    address: DataTypes.TEXT,
    expectedDate: DataTypes.DATE,
    startDate: DataTypes.DATE,
    finishDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  DBShipments.associate = function(models) {
    // associations can be defined here
  };
  return DBShipments;
};