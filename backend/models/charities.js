'use strict';

module.exports = (sequelize, DataTypes) => {
    const Charities = sequelize.define('Charities', {
        id: {
            type: DataTypes.INTEGER, // or DataTypes.UUID if you prefer
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        founder: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        about: {
            type: DataTypes.STRING,
            allowNull: false
        },
        purpose: {
            allowNull: false,
            type: DataTypes.STRING
        },
        locationID: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: "Locations", // Locations
                key: "id",
              },
              onUpdate: "CASCADE",
              onDelete: "CASCADE",
        },
        private: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        }

    }, {
        tableName: 'Charities',
        timestamps: true, // Include createdAt and updatedAt fields
    });

    Charities.associate = (models) => {
        Charities.belongsTo(models.Locations, { foreignKey: "locationID", as: "location" });
      };

    return Charities
};