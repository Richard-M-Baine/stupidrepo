const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {Requests} = require('../models') 
const { setTokenCookie, requireAuth, restoreUser } = require('../middleware/authenticate.js');
const router = express.Router();


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

router.get('/:id/edit', restoreUser, requireAuth, async (req, res) => {
    const request = Requests.findByPk(req.params.id)

    if (request){
        if (group.founder !== req.user.userName) {
            const err = new Error('You must be the owner to edit this group')
            err.status = 403
            return err.status
          }
    }

    const {title, startTime, endTime, details, address, city, state} = req.body

    request.set({
        title: title,
        startTime: startTime,
        endTime: endTime,
        details: details,
        address: address,
        city: city,
        state: state

    })

    await request.save()
    res.json(request)
})

router.get('/:id', restoreUser, requireAuth, async (req, res) => {
    const id = req.params.id
    const request = await Requests.findByPk(id)
    res.json(request)
})

module.exports = router