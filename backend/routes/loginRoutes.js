const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { setTokenCookie } = require('../middleware/authenticate');

const router = express.Router();
const { secret, expiresIn } = jwtConfig;
const JWT_SECRET = secret

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body, ' i am req.body ')
  try {
    const user = await User.findOne({ where: { userName } });
    console.log('i am user ', user, 'i am the password now ',password)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userId = user.id; // Store user ID in session
    res.json({ message: "Login successful", user: { id: user.id, userName: user.userName, email: user.email } });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
