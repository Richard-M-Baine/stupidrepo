const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {Charities} = require('../models') 
const {Locations} = require('../models')
const { setTokenCookie, restoreUser, requireAuth } = require('../middleware/authenticate.js');
const router = express.Router();


router.delete('/:id/edit', restoreUser, requireAuth, async (req, res) => {
    const groupId = req.params.id;

    try {
        const oneGroup = await Charities.findByPk(groupId);

        if (!oneGroup) {
            return res.status(404).send('<h1>No such thing Exists</h1>');
        }

        if (oneGroup.founder === req.user.userName) {
            await oneGroup.destroy();
            return res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
        } else {
            return res.status(403).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/current', restoreUser, requireAuth, async (req, res) => {
    try {
        console.log('i am in current groups')
        // Fetch groups where the founder matches the authenticated user
        const myCharities = await Charities.findAll({
            where: { founder: req.user.userName } 
        });

        // Convert to JSON-friendly format
        const response = { Charities: myCharities.map(charity => charity.toJSON()) };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching groups:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create', restoreUser, requireAuth, async (req, res) => {
    const { founder , name, about, purpose, private, address, city, state } = req.body


    const newLocation = await Locations.create({
        address: address,
        city: city,
        state: state,
        lat: '2343.223',
        lon: '222.222',
        
    })

    const newCharity = await Charities.create({
        founder: founder,
        name: name,
        about: about,
        purpose: purpose,
        locationID: newLocation.id,
        private: private
    })
res.json({newCharity})
})

module.exports = router