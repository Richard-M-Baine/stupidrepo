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

    const id = req.params.id
    const location = await Locations.findByPk(id)

    if (location){
        if (location.founder !== req.user.userName) {
          const err = new Error('You must be the owner to edit this group')
          err.status = 403
          return err.status
        }}
      

    const {address, city, state} = req.body
   
    const coords = await getCoordinates(`${address}, ${city}, ${state}`);

    location.set({
        address: address,
        city: city,
        state: state,
        lat: coords.lat,
        lon: coords.lon
    })

    await location.save()


    res.json(location)
})



module.exports = router