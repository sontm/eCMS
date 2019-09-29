'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBCarts = sequelize.define('DBCarts', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.SMALLINT
  }, {});
  DBCarts.associate = function(models) {
    // associations can be defined here
  };
  return DBCarts;
};