'use strict';
const bcrypt = require("bcryptjs");


// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Messages';
        return await queryInterface.bulkInsert(options, [
            {
                sender: 'loseRings',
                body: 'testing 5555555',
                recipient: 'walktomordor',
                hasRead: false,
                
            },
            {
                sender: 'walktomordor',
                body: 'testing 2342334',
                recipient: 'loseRings',
                hasRead: false,
                
            },
            {
                sender: 'cthulhu',
                body: 'Cthulhu Ftagn!',
                recipient: 'walktomordor',
                hasRead: false,
                
         
},


    ], );
    
  },

down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Messages';
    return queryInterface.bulkDelete(options, null, {});

    }

}
