'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBFavorites = sequelize.define('DBFavorites', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  DBFavorites.associate = function(models) {
    // associations can be defined here
  };
  return DBFavorites;
};