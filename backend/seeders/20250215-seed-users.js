
'use strict';
const bcrypt = require("bcryptjs");


// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Users';
        return await queryInterface.bulkInsert(options, [
            {


                username: 'loseRings',
                email: 'bilbo@gmail.com',
                password: bcrypt.hashSync('password'),
                latitude: 41.5,
                longitude: -81.7,
                searchRadiusMiles: 15
            },
            {
                username: 'walktomordor',
                email: 'mordor@gmail.com',
                password: bcrypt.hashSync('password1'),
                latitude: 74.20,
                longitude: -70.24,
                searchRadiusMiles: 15
            }, {
                username: 'cthulhu',
                email: 'cthulhu@gmail.com',
                password: bcrypt.hashSync('password3'),
                latitude: 74.20,
                longitude: -70.24,
                searchRadiusMiles: 15
            },
           


        ], );

    },

    down: async (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        options.tableName = 'Users';
        return queryInterface.bulkDelete(options, 'Users', {

        })

    }
};