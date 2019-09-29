'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBRecentViews = sequelize.define('DBRecentViews', {
    userId: DataTypes.INTEGER, // PK, not userId as Google, FB
    productId: DataTypes.INTEGER
  }, {});
  DBRecentViews.associate = function(models) {
    // associations can be defined here
  };
  return DBRecentViews;
};