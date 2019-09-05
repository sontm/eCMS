'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBBrands = sequelize.define('DBBrands', {
    name: DataTypes.STRING,
    imgLogo: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {});
  DBBrands.associate = function(models) {
    // associations can be defined here
  };
  return DBBrands;
};