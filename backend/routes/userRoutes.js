const express = require('express');
const { User } = require('../models');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'You have access to this route!', user: req.user });
});





router.post('/create', async (req,res,next) => {
    console.log(req.body, 'i am inside create')
    const {userName, email, password } = req.body

    if (!userName || !email || !password) {
        return res.status(400).json({ error: "userName and email are required" });
    }

    const newUser = await User.create({ userName, email, password });

    return res.status(201).json(newUser);

});

module.exports = router;
