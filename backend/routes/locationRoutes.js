const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Locations} = require('../models')
const { getCoordinates } = require('../utils/geocode');

const { setTokenCookie, restoreUser, requireAuth } = require('../middleware/authenticate.js');
const router = express.Router();

router.get('/all', restoreUser, requireAuth, async (req, res) => {
    console.log('i am in locations!')
     const location = await Locations.findAll()
     const newLocation = location.map(loc => loc.toJSON())
     res.json(newLocation)
 })


router.get('/:id', restoreUser, requireAuth, async (req, res) => {
    const id = req.params.id
    const location = await Locations.findByPk(id)
    res.json(location)
})

router.put('/edit/:id', restoreUser, requireAuth, async (req, res) => {
   
    const id = req.params.id
    const locationGrab = await Locations.findByPk(id)
    const location = locationGrab.toJSON()

   


    const {name, address, city, county, state, country, postalCode} = req.body


    let coords = { lat: '50', lon: '50' };

    try {
        coords = await getCoordinates(address, city, county, state, postalCode);
    } catch (error) {
        console.error("Geocoding failed:", error);
    }
    
    
    
    locationGrab.set({
        name,
        address,
        city,
        county,
        state,
        country,
        postalCode,
        lat: coords.lat,  // Now guaranteed to exist
        lon: coords.lon   // Now guaranteed to exist
    });
    
    await locationGrab.save();
    

    const updatedLocation = await Locations.findByPk(id)

    res.json(updatedLocation)
})





module.exports = router