'use strict';
module.exports = (sequelize, DataTypes) => {
  const DBProducts = sequelize.define('DBProducts', {
    name: DataTypes.STRING,
    descShort: DataTypes.STRING,
    descMedium: DataTypes.TEXT,
    descLong: DataTypes.TEXT,
    unitPrice: DataTypes.FLOAT,
    stockNum: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    imgThump: DataTypes.STRING,
    img1: DataTypes.STRING,
    img2: DataTypes.STRING,
    img3: DataTypes.STRING,
    img4: DataTypes.STRING,
    img5: DataTypes.STRING,
    img6: DataTypes.STRING,
    firstCategoryId: DataTypes.INTEGER,
    secondCategoryId: DataTypes.INTEGER,
    thirdCategoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    parentProductId: DataTypes.INTEGER,
    productAttributeId: DataTypes.INTEGER
  }, {});
  DBProducts.associate = function(models) {
    // associations can be defined here
    DBProducts.belongsTo(models.DBCategories, {
      foreignKey: 'firstCategoryId',
      as: 'categories'
    });
    DBProducts.belongsTo(models.DBBrands, {
      foreignKey: 'brandId',
      as: 'brands'
    });
    DBProducts.belongsToMany(models.DBAttributes, {
      through: 'DBProductAttributes',
      foreignKey: 'productId',
      otherKey: 'attributeId',
      as: 'attributes'
    });
    DBProducts.hasMany(models.DBDiscounts, {
      foreignKey: 'applyProductId',
      as: 'productDiscounts', // Must Have
    });

    // Recent Views
    DBProducts.belongsToMany(models.DBUsers, {
      through: 'DBRecentViews',
      foreignKey: 'productId',
      otherKey: 'userId',
      as: 'recentViews'
    });

    // Favorites of User
    DBProducts.belongsToMany(models.DBUsers, {
      through: 'DBFavorites',
      foreignKey: 'productId',
      otherKey: 'userId',
      as: 'favorites'
    });
  };
  return DBProducts;
};