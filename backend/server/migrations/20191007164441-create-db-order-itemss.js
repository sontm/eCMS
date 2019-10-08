'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DBOrderItemsses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      descShort: {
        type: Sequelize.STRING
      },
      descMedium: {
        type: Sequelize.TEXT
      },
      unitPrice: {
        type: Sequelize.FLOAT
      },
      imgThump: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.SMALLINT
      },
      unitDiscountMoney: {
        type: Sequelize.FLOAT
      },
      finalTotal: {
        type: Sequelize.FLOAT
      },
      firstCategoryId: {
        type: Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER
      },
      shipmentId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DBOrderItemsses');
  }
};