'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let options = {}; // Declare options inside the function
        if (process.env.NODE_ENV === 'production') {
            options.schema = process.env.SCHEMA;  
        }
        options.tableName = 'Charities'; // Set the table name

        return await queryInterface.bulkInsert(options, [
            {
                founder: 'loseRings',
                name: 'Seeds of Service',
                about: 'food pantry in brick township',
                purpose: 'food',
                locationID: 1,
                private: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
           
        ], {}); 
    },

    down: async (queryInterface, Sequelize) => {
        let options = {}; // Declare options inside the function
        if (process.env.NODE_ENV === 'production') {
            options.schema = process.env.SCHEMA;  
        }
        options.tableName = 'Charities';

        return queryInterface.bulkDelete(options, null, {}); 
    }
};
