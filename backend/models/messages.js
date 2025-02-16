'use strict';

module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Messages', {
        id: {
            type: DataTypes.INTEGER, // or DataTypes.UUID if you prefer
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipient: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hasRead: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
       
      

    }, {
        tableName: 'Messages',
        timestamps: true, // Include createdAt and updatedAt fields
    });

    return Messages;
};