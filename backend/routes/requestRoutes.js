const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {Requests} = require('../models') 
const { setTokenCookie, requireAuth, restoreUser } = require('../middleware/authenticate.js');
const router = express.Router();


router.delete('/:id/edit', requireAuth, async (req, res) => {
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


module.exports = router