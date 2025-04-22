const express = require('express');
const { User } = require('../models');
const router = express.Router();
const { authenticateToken, restoreUser, requireAuth } = require('../middleware/authenticate');
const { getCoordinates } = require('../utils/enrollGeocode');

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'You have access to this route! Huzzah!', user: req.user });
});

router.get('/me', restoreUser, async (req, res) => { // Removed requireAuth here
  try {
    if (req.user) {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ id: user.id, userName: user.userName, email: user.email, latitude: user.latitude, longitude: user.longitude, searchRadiusMiles: user.searchRadiusMiles });
    } else {
      // No user found in cookies, respond accordingly (e.g., null or an empty object)
      return res.json(null);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});








router.post('/signup', async (req, res) => {
  const { userName, email, password, latitude, longitude } = req.body;
  console.log(req.body)

  
  try {
    const newUser = await User.create({
      userName,
      email,
      password,
      latitude,
      longitude,
      searchRadiusMiles: 25 // default as defined on the model
    });
    return res.json(newUser.toSafeObject());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during sign-up.' });
  }
});




router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Name of the cookie you set for JWT
  res.json({ message: "Logged out successfully" });
});






module.exports = router;
