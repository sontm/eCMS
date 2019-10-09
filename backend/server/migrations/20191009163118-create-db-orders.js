'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DBOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerIdFK: {
        type: Sequelize.INTEGER
      },
      custId: {
        type: Sequelize.STRING
      },
      custFullName: {
        type: Sequelize.STRING
      },
      custProvince: {
        type: Sequelize.STRING
      },
      custDistrict: {
        type: Sequelize.STRING
      },
      custWard: {
        type: Sequelize.STRING
      },
      custAddress: {
        type: Sequelize.TEXT
      },
      custPhone: {
        type: Sequelize.STRING
      },
      custEmail: {
        type: Sequelize.STRING
      },
      itemTotal: {
        type: Sequelize.FLOAT
      },
      shipTotal: {
        type: Sequelize.FLOAT
      },
      finalTotal: {
        type: Sequelize.FLOAT
      },
      orderNumber: {
        type: Sequelize.STRING
      },
      placeDate: {
        type: Sequelize.DATE
      },
      confirmedDate: {
        type: Sequelize.DATE
      },
      cancelDate: {
        type: Sequelize.DATE
      },
      deliveringDate: {
        type: Sequelize.DATE
      },
      completedDate: {
        type: Sequelize.DATE
      },
      status: {
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
    return queryInterface.dropTable('DBOrders');
  }
};