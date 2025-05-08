const express = require('express');
const { User } = require('../models');
const router = express.Router();
const { authenticateToken, restoreUser, requireAuth, setTokenCookie } = require('../middleware/authenticate');
const { getCoordinates } = require('../utils/enrollGeocode');
const bcrypt = require('bcryptjs');

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
  console.log(req.body, 'the aforementioned crap is req.body')

  console.log('password in route:', password, typeof password);

  try {
    const newUser = await User.create({
      userName,
      email,
      password,
      latitude,
      longitude,
      searchRadiusMiles: 25 // default as defined on the model
    });
    console.log('we are on line 51')
    await setTokenCookie(res, newUser);
    console.log('setTokenCookie set')
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


router.put('/update', restoreUser, requireAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found /update you are not logged in or thee is an error mr web developer.  ' });
    }

    const { email, password, latitude, longitude, searchRadiusMiles } = req.body;

    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (latitude !== undefined) user.latitude = latitude;
    if (longitude !== undefined) user.longitude = longitude;
    if (searchRadiusMiles !== undefined) user.searchRadiusMiles = searchRadiusMiles;

    await user.save();

    return res.json(user.toSafeObject());
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;
