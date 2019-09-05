'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DBProducts', {
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
      descLong: {
        type: Sequelize.TEXT
      },
      unitPrice: {
        type: Sequelize.FLOAT
      },
      stockNum: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      imgThump: {
        type: Sequelize.STRING
      },
      img1: {
        type: Sequelize.STRING
      },
      img2: {
        type: Sequelize.STRING
      },
      img3: {
        type: Sequelize.STRING
      },
      img4: {
        type: Sequelize.STRING
      },
      img5: {
        type: Sequelize.STRING
      },
      img6: {
        type: Sequelize.STRING
      },
      firstCategoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'DBCategories',
          key: 'id',
          as: 'firstCategoryId',
        },
      },
      secondCategoryId: {
        type: Sequelize.INTEGER
      },
      thirdCategoryId: {
        type: Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.INTEGER
      },
      parentProductId: {
        type: Sequelize.INTEGER
      },
      productAttributeId: {
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
    return queryInterface.dropTable('DBProducts');
  }
};