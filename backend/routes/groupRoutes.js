const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {Charities} = require('../models') 

const router = express.Router();


router.delete('/:id/edit', requireAuth, async (req, res) => {
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


module.exports = router