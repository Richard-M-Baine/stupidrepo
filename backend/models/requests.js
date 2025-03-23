'use strict';

module.exports = (sequelize, DataTypes) => {
  const Requests = sequelize.define('Requests', {
    id: {
      type: DataTypes.INTEGER, // or DataTypes.UUID if you prefer
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      allowNull: false,
      type: DataTypes.DATE
    },
    details: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },

    county: {
      allowNull: false,
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lon: {
      type: DataTypes.FLOAT,
      allowNull: false
    },



  }, {
    tableName: 'Requests',
    timestamps: true, // Include createdAt and updatedAt fields
  });

  return Requests;
};