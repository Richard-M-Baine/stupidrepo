const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const bcrypt = require('bcryptjs');
const { User } = require('../models');


const router = express.Router();
const { secret, expiresIn } = jwtConfig;
const JWT_SECRET = secret

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ where: { userName } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.user = { id: user.id, userName: user.userName, email: user.email };
  await req.session.save(); // Ensure session is saved before responding

  console.log("LOGIN: req.session.user =", req.session.user);
  res.json({ user: req.session.user });
});



module.exports = router;
