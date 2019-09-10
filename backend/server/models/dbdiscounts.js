'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBDiscounts = sequelize.define('DBDiscounts', {
    desc: DataTypes.TEXT,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    type: DataTypes.STRING,
    fixMoney: DataTypes.INTEGER,
    percent: DataTypes.SMALLINT,
    applyCategoryId: DataTypes.INTEGER,
    applyBrandId: DataTypes.INTEGER,
    applyProductId: DataTypes.INTEGER,
    img: DataTypes.STRING,
    coupon: DataTypes.STRING
  }, {});
  DBDiscounts.associate = function(models) {
    // associations can be defined here
  };
  return DBDiscounts;
};