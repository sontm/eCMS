'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DBDiscounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.TEXT
      },
      from: {
        type: Sequelize.DATE
      },
      to: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      fixMoney: {
        type: Sequelize.INTEGER
      },
      percent: {
        type: Sequelize.SMALLINT
      },
      applyCategoryId: {
        type: Sequelize.INTEGER
      },
      applyBrandId: {
        type: Sequelize.INTEGER
      },
      applyProductId: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.STRING
      },
      coupon: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('DBDiscounts');
  }
};