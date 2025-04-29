const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {Charities} = require('../models') 
const {Locations} = require('../models')
const { setTokenCookie, restoreUser, requireAuth } = require('../middleware/authenticate.js');
const router = express.Router();
const { getCoordinates } = require('../utils/geocode');

// scary math


const toRad = degrees => degrees * (Math.PI / 180);
const distanceMiles = (lat1, lon1, lat2, lon2) => {
  const R = 3959; // earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

router.delete('/:id/delete', restoreUser, requireAuth, async (req, res) => {
    const groupId = req.params.id;
    console.log('i am in the delete route')
   
        const oneGroup = await Charities.findByPk(groupId);
        
        if (!oneGroup ) {
            return res.status(404).send('<h1>No such thing Exists</h1>');
        }

        if (oneGroup.founder === req.user.userName) {
            const locationID = oneGroup.locationID;
        
            await oneGroup.destroy();
        
            // Check if any other charities still use that location
            const otherCharitiesUsingLocation = await Charities.findAll({
                where: { locationID }
            });
        
            if (otherCharitiesUsingLocation.length === 0) {
                const locationToDelete = await Locations.findByPk(locationID);
                if (locationToDelete) {
                    await locationToDelete.destroy();
                }
            }
        
            return res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
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
            name,
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
    try {
        // 1) Get the user's location and radius
        const user = await User.findByPk(req.user.id, {
            attributes: ['latitude', 'longitude', 'searchRadiusMiles']
        });
        const { latitude, longitude, searchRadiusMiles = 15 } = user.toJSON();

        // 2) Pull all groups + their locations
        const groups = await Charities.findAll({
            include: {
                model: Locations,
                as: 'location', // <-- required because of the alias
                attributes: ['lat', 'lon', 'address', 'city', 'state']
            }
        });

        // 3) Filter based on distance
        const groupsWithDistance = groups.map(group => {
            const g = group.toJSON();
            const loc = g.location;
            const distance = distanceMiles(latitude, longitude, loc.lat, loc.lon);
            return {
                ...g,
                distance
            };
        });

        const filteredGroups = groupsWithDistance
            .filter(group => group.distance <= searchRadiusMiles)
            .sort((a, b) => a.distance - b.distance);

            console.log('i am filtered groups .', filteredGroups)
        res.json(filteredGroups);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});
    
 

router.get('/:id', restoreUser, requireAuth, async (req, res) => {
    const id = req.params.id
    const group = await Charities.findByPk(id)
    res.json(group)
})






module.exports = router