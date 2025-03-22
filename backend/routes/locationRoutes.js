const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Locations} = require('../models')
const { getCoordinates } = require('../utils/geocode');

const { setTokenCookie, restoreUser, requireAuth } = require('../middleware/authenticate.js');
const router = express.Router();


router.get('/:id', restoreUser, requireAuth, async (req, res) => {
    const id = req.params.id
    const location = await Locations.findByPk(id)
    res.json(location)
})

router.put('/edit/:id', restoreUser, requireAuth, async (req, res) => {
    console.log('i am in the backend')
    const id = req.params.id
    const locationGrab = await Locations.findByPk(id)
    const location = locationGrab.toJSON()
    console.log(location, 'i am location')
   


    const {address, city, state} = req.body

    console.log(req.body, 'i am req.body')

    const coords = await getCoordinates(address, city, state);

    locationGrab.set({
        address: address,
        city: city,
        state: state,
        lat: coords.lat,
        lon: coords.lon
    })

    await locationGrab.save()

    const updatedLocation = await Locations.findByPk(id)

    res.json(updatedLocation)
})



module.exports = router