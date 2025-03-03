const express = require('express');
const { User } = require('../models');
const router = express.Router();
const { authenticateToken, requireAuth } = require('../middleware/authenticate');

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'You have access to this route!', user: req.user });
});

router.get('/me', requireAuth, async (req, res) => {
  console.log('i am here')
  try {
    const user = await User.findByPk(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ id: user.id, userName: user.userName, email: user.email });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});





router.post('/create', async (req,res,next) => {
   
    const {userName, email, password } = req.body

    if (!userName || !email || !password) {
        return res.status(400).json({ error: "userName and email are required" });
    }
    
    const newUser = await User.create({ userName, email, password });

    return res.status(201).json(newUser);

});

router.post('/logout', (req, res) => {
  console.log(req.session, 'before logout');

  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie('connect.sid'); // Use the session cookie name (default: 'connect.sid')
    console.log(req.session, 'after logout');
    
    res.json({ message: "Logged out successfully" });
  });
});





module.exports = router;
