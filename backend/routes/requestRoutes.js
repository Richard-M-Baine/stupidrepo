const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../models');
const { User } = require('../models');
const {Requests} = require('../models') 
const { setTokenCookie, requireAuth, restoreUser } = require('../middleware/authenticate.js');
const router = express.Router();
const { getCoordinates } = require('../utils/geocode');

// lets make dates

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });
};

// math crap
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

router.delete('/:id/delete',restoreUser, requireAuth, async (req, res) => {
    const requestId = req.params.id;

    try {
        const oneRequest = await Requests.findByPk(requestId);

        if (!oneRequest) {
            return res.status(404).send('<h1>No such thing Exists</h1>');
        }

        if (oneRequest.userName === req.user.userName) {
            await oneRequest.destroy();
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
        // Fetch groups where the founder matches the authenticated user
        const myRequests = await Requests.findAll({
            where: { userName: req.user.userName } 
        });

        // Convert to JSON-friendly format
        const response = { Requests: myRequests.map(request => request.toJSON()) };
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching groups:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/:id/edit', restoreUser, requireAuth, async (req, res) => {
 
    const request = await Requests.findByPk(req.params.id);

    if (!request) {
        return res.status(404).json({ error: 'Request not found' });
    }
    
    const requestJSON = request.toJSON(); // Convert after confirming it exists
    console.log(requestJSON);
    
    if (requestJSON.userName !== req.user.userName) {
        return res.status(403).json({ error: 'You must be the owner to edit this request' });
    }

    let coords = { lat: '50', lon: '50' };
    
    const { title, start_time, end_time, details, address, city, county, postalCode, state } = req.body;
    
    
    try {
        coords = await getCoordinates(address, city, county, state, postalCode);
    } catch (error) {
        console.error("Geocoding failed:", error);
    }
    
    console.log("Final coordinates used:", coords); 
    
    await request.update({
        title,
        startTime: start_time,
        endTime: end_time,
        details,
        address,
        city,
        county,
        state,
        postalCode,
        lat: coords.lat,  // Now guaranteed to exist
        lon: coords.lon   // Now guaranteed to exist
    });
    
    res.json(request.toJSON()); // Send updated request as JSON

})

router.get('/all', restoreUser, requireAuth, async (req, res) => {
    // 1) Get the user’s location & radius
    const user = await User.findByPk(req.user.id, { attributes: ['latitude','longitude','searchRadiusMiles'] });
    const { latitude, longitude, searchRadiusMiles = 15 } = user.toJSON();
  
    // 2) Pull all requests
    const allRequests = await Requests.findAll();
    
    const locs = allRequests.map(r => r.toJSON());
  
    // 3) Filter in JS
    const withinRadius = locs
      .map(loc => ({
        ...loc,
        distance: distanceMiles(latitude, longitude, loc.lat, loc.lon)
      }))
      .filter(loc => loc.distance <= searchRadiusMiles)
      .sort((a, b) => a.distance - b.distance);
  
    res.json(withinRadius);
  });



router.get('/:id', restoreUser, requireAuth, async (req, res) => {
    const id = req.params.id
    const request = await Requests.findByPk(id)
    const returnRequest = request.toJSON()
    console.log(returnRequest)
    res.json(returnRequest)
})

router.post('/create', restoreUser, requireAuth, async (req, res) => {
    const { title, start_time, end_time, details, address, city, county, state, country, postalCode } = req.body;
   
    const user = req.user.userName;

    let coords = { lat: '50', lon: '50' };
    coords = await getCoordinates(address, city, county, state, postalCode);

    const newRequest = await Requests.create({
        userName: user,
        title: title,
        startTime: start_time,
        endTime: end_time,
        details: details,
        address: address,
        city: city,
        county: county,
        state: state,
        country: country,
        postalCode: postalCode,
        lat: coords.lat,
        lon: coords.lon
    });

    // Format the response before sending it to the frontend
    res.json({
        newRequest: {
            ...newRequest.toJSON(),
            startTimeFormatted: formatDate(newRequest.startTime),
            endTimeFormatted: formatDate(newRequest.endTime)
        }
    });
});

module.exports = router