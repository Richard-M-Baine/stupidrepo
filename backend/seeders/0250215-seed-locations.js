'use strict';
const bcrypt = require("bcryptjs");


// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Locations';
        return await queryInterface.bulkInsert(options, [
            {
                address: '123 cedar street',
                city: 'Montclair',
                state: 'NJ',
                lat: 60.23,
                lon: 13.22
            },
            {
                address: '123 maple street',
                city: 'Lakewood',
                state: 'NJ',
                lat: 57.23,
                lon: 13.98
            },
            {
        
                address: '123 oak street',
                city: 'Cherry Hill',
                state: 'NJ',
                lat: 60.23,
                lon: 19.22
            
      },
      


    ], );
    
  },

down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Locations';
    return queryInterface.bulkDelete(options, null, {});{

    }

}
};