"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      county: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      lon: {
        type: Sequelize.FLOAT,
        allowNull: false
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
    await queryInterface.dropTable("Locations");
  }
};
