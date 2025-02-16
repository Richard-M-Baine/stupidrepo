'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Charities';
        return await queryInterface.bulkInsert(options, [
            {
                founder: 'loseRings',
                name: 'Seeds of Service',
                about: 'food pantry in brick township',
                purpose: 'food',
                locationID: 1,
                private: false
            },
            {
                founder: 'walktomordor',
                name: 'Lakewood Food not Bombs',
                about: 'vegan pop up food pantry',
                purpose: 'food',
                locationID: 2,
                private: false
            },
            {
                founder: 'cthulhu',
                name: 'Catholic Charities',
                about: 'immigration help and mental health care',
                purpose: 'legal / mental health',
                locationID: 3,
                private: false
            }
        ], {}); // Fix: Removed empty object in the array
    },

    down: async (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        options.tableName = 'Charities';
        return queryInterface.bulkDelete(options, null, {}); // Fix: Properly delete all entries
    }
};
