"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Charities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      founder: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      about: {
        type: Sequelize.STRING,
        allowNull: false
      },
      purpose: {
        allowNull: false,
        type: Sequelize.STRING
      },
      locationID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      private: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Charities");
  }
};
