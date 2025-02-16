'use strict';

module.exports = (sequelize, DataTypes) => {
    const Locations = sequelize.define('Locations', {
        id: {
            type: DataTypes.INTEGER, // or DataTypes.UUID if you prefer
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            allowNull: false,
            type: DataTypes.FLOAT
        },
        lon: {
            allowNull: false,
            type: DataTypes.FLOAT
        },
      

    }, {
        tableName: 'Locations',
        timestamps: true, // Include createdAt and updatedAt fields
    });

    Locations.associate = (models) => {
        Locations.hasMany(models.Charities, { foreignKey: "locationID" });
      };

    return Locations;
};