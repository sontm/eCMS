'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBCountries = sequelize.define('DBCountries', {
    name: DataTypes.STRING,
    code: DataTypes.TEXT
  }, {});
  DBCountries.associate = function(models) {
    // associations can be defined here
    DBCountries.hasMany(models.DBBrands, {
      foreignKey: 'countryId',
      as: 'brandItems',
    });
  };
  return DBCountries;
};