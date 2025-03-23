const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {Requests} = require('../models') 
const { setTokenCookie, requireAuth, restoreUser } = require('../middleware/authenticate.js');
const router = express.Router();

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
    
    const { title, start_time, end_time, details, address, city, postalCode, state } = req.body;
    
    console.log('Request before update:', requestJSON, 'Request body:', req.body);
    
    await request.update({
        title,
        startTime: start_time,
        endTime: end_time,
        details,
        address,
        city,
        county,
        state,
        postalCode
    });
    
    res.json(request.toJSON()); // Send updated request as JSON

})

router.get('/:id', restoreUser, requireAuth, async (req, res) => {
    const id = req.params.id
    const request = await Requests.findByPk(id)
    res.json(request)
})

router.post('/create', restoreUser, requireAuth, async (req, res) => {
    const { title, start_time, end_time, details, address, city, county, state, postalCode } = req.body;
    console.log('i am req.body ', req.body);
    const user = req.user.userName;

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
        postalCode: postalCode,
        lat: '22.220',
        lon: '22.22'
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