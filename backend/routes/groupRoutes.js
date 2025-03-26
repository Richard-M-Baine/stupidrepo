const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {Charities} = require('../models') 
const {Locations} = require('../models')
const { setTokenCookie, restoreUser, requireAuth } = require('../middleware/authenticate.js');
const router = express.Router();
const { getCoordinates } = require('../utils/geocode');


router.delete('/:id/delete', restoreUser, requireAuth, async (req, res) => {
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



router.put('/:id/edit', restoreUser, requireAuth, async (req, res) => {
    

    const group = await Charities.findByPk(req.params.id)

// better way

if (group){
  if (group.founder !== req.user.userName) {
    const err = new Error('You must be the owner to edit this group')
    err.status = 403
    return err.status
  }}

 const { name, about, type, city, state, private } = req.body



group.set({
    name: name,
    about: about,
    type: type,
    city: city,
    state: state,
    private: private
  })
  
  await group.save()
  
  
  res.json(group)

 



})



router.get('/current',restoreUser, requireAuth, async (req, res) => {
    
    try {
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
    const { founder, name, about, purpose, private, address, city, county, state, country, postalCode } = req.body;
    let coords = { lat: '50', lon: '50' };
    try {
        // Get latitude & longitude from OpenStreetMap
       

        coords = await getCoordinates(address, city, county, state, postalCode);
   
    
    console.log("Final coordinates used:", coords);
        
        const newLocation = await Locations.create({
            address,
            city,
            county,
            state,
            country,
            postalCode,
            lat: coords.lat,
            lon: coords.lon
        });

        const newCharity = await Charities.create({
            founder,
            name,
            about,
            purpose,
            locationID: newLocation.id,
            private
        });

        res.json({ newCharity });
    } catch (error) {
        console.error("Geocoding error:", error);
        res.status(500).json({ error: "Failed to get coordinates" });
    }
});

router.get('/all', restoreUser, requireAuth, async (req, res) => {
    console.log('i am in all')
     const group = await Charities.findAll()
     const newGroup = group.map(charity => charity.toJSON());

    res.json(newGroup)
 })

router.get('/:id', restoreUser, requireAuth, async (req, res) => {
    const id = req.params.id
    const group = await Charities.findByPk(id)
    res.json(group)
})






module.exports = router