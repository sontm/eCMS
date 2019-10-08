'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBOrderItemss = sequelize.define('DBOrderItemss', {
    name: DataTypes.STRING,
    descShort: DataTypes.STRING,
    descMedium: DataTypes.TEXT,
    unitPrice: DataTypes.FLOAT,
    imgThump: DataTypes.STRING,
    quantity: DataTypes.SMALLINT,
    unitDiscountMoney: DataTypes.FLOAT,
    finalTotal: DataTypes.FLOAT,
    firstCategoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    shipmentId: DataTypes.INTEGER
  }, {});
  DBOrderItemss.associate = function(models) {
    // associations can be defined here
    DBOrderItemss.hasMany(models.DBOrderItemAttributes, {
      foreignKey: 'orderItemId',
      as: 'attributes', // Must Have
    });
  };
  return DBOrderItemss;
};