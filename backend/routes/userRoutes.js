const express = require('express');
const { User } = require('../models');
const router = express.Router();
const { authenticateToken, requireAuth } = require('../middleware/authenticate');
const { getCoordinates } = require('../utils/enrollGeocode');

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'You have access to this route! Huzzah!', user: req.user });
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ id: user.id, userName: user.userName, email: user.email });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});








router.post('/signup', async (req, res) => {
  const { userName, email, password, address, city, state, postalCode } = req.body;

  // Get coordinates from your geocode function
  const { lat, lon } = await getCoordinates(address, city, state, postalCode);

  // Check if valid coordinates are returned; you might want to do further validation
  if (lat === null || lon === null) {
    return res.status(400).json({ error: 'Unable to validate location. Please check your address details.' });
  }
  
  try {
    const newUser = await User.create({
      userName,
      email,
      password,
      latitude: lat,
      longitude: lon,
      searchRadiusMiles: 15 // default as defined on the model
    });
    return res.json(newUser.toSafeObject());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during sign-up.' });
  }
});




router.post('/logout', (req, res) => {

  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie('connect.sid'); // Use the session cookie name (default: 'connect.sid')
    
    res.json({ message: "Logged out successfully" });
  });
});





module.exports = router;
