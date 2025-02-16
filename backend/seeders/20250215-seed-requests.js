"use strict";
const bcrypt = require("bcryptjs");


// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Requests';
        return await queryInterface.bulkInsert(options, [
            
               { userName: 'cthulhu',
                title: 'I need food',
                startTime: '2025-03-01T12:00:00Z',
                endTime: '2025-05-01T12:00:00Z',
                details: 'i need food and the pantry is short on supplies',
                address: '233 Brick Blvd',
                city: 'Brick Township',
                state: 'NJ',
                lat: '60.3',
                lon: '2.53'
               }
        ], );

    },

    down: async (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        options.tableName = 'Requests';
        return queryInterface.bulkDelete(options, null, );
           
        }

    }
