const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { setTokenCookie } = require('../middleware/authenticate'); // Import the helper

const router = express.Router();

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ where: { userName } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Call setTokenCookie to create a JWT and send it as a cookie
  setTokenCookie(res, user);

  // Send back a proper user payload (using toSafeObject)
  res.json({ user: user.toSafeObject() });
});

module.exports = router;
