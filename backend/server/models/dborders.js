'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBOrders = sequelize.define('DBOrders', {
    customerIdFK: DataTypes.INTEGER,
    custId: DataTypes.STRING,
    custFullName: DataTypes.STRING,
    custProvince: DataTypes.STRING,
    custDistrict: DataTypes.STRING,
    custAddress: DataTypes.TEXT,
    custPhone: DataTypes.STRING,
    custEmail: DataTypes.STRING,
    itemTotal: DataTypes.FLOAT,
    shipTotal: DataTypes.FLOAT,
    finalTotal: DataTypes.FLOAT,
    orderNumber: DataTypes.STRING,
    placeDate: DataTypes.DATE,
    confirmedDate: DataTypes.DATE,
    cancelDate: DataTypes.DATE,
    deliveringDate: DataTypes.DATE,
    completedDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  DBOrders.associate = function(models) {
    // associations can be defined here
    DBOrders.hasMany(models.DBOrderItemss, {
      foreignKey: 'orderId',
      as: 'orderItems', // Must Have
    });
    DBOrders.hasMany(models.DBShipments, {
      foreignKey: 'orderId',
      as: 'shipments', // Must Have
    });
  };
  return DBOrders;
};