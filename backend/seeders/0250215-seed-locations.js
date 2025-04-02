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
                name: 'Seeds of Service',
                address: '123 oak street',
                city: 'Cherry Hill',
                county: 'Camden',
                state: 'NJ',
                country: 'us',
                postalCode: '08742',
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