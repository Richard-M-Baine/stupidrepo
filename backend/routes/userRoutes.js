const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.get('/getall', async (req, res, next) => {

    const users = await User.findAll()

    res.json(users)
})


router.post('/create', async (req,res,next) => {
    console.log(req.body)
    const {userName, email } = req.body

    if (!userName || !email) {
        return res.status(400).json({ error: "userName and email are required" });
    }

    const newUser = await User.create({ userName, email });

    return res.status(201).json(newUser);

});

module.exports = router;
