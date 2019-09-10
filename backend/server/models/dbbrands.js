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
    DBBrands.hasMany(models.DBProducts, {
      foreignKey: 'brandId',
      as: 'productItems',
    });
    DBBrands.belongsTo(models.DBCountries, {
      foreignKey: 'countryId',
      as: 'countries'
    });
    DBBrands.hasMany(models.DBDiscounts, {
      foreignKey: 'applyBrandId',
      as: 'brandDiscounts',
    });
  };
  return DBBrands;
};