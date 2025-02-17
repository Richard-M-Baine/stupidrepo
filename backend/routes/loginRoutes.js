const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const router = express.Router();
const JWT_SECRET = 'your_secret_key'; // Store in .env for production

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ where: { userName } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  // Send user data along with token
  res.json({
    token,
    id: user.id,
    userName: user.userName,
    email: user.email
  });
});


module.exports = router;
