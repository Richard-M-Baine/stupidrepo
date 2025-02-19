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
  const user = await User.unscoped().findOne({ where: { userName } });
  

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' }); 

  // Set the token as a cookie
  setTokenCookie(res, user); 

  // Send user data along with token 
  res.json({ 
      token,  // You might not need to send the token in the body now
      id: user.id,
      userName: user.userName,
      email: user.email
  });

});


module.exports = router;
