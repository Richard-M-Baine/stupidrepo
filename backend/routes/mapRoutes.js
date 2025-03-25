const express = require('express');
const router = express.Router();
require('dotenv').config(); // Load environment variables

router.post('/key', (req, res) => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    res.json({ googleMapsAPIKey: key });
});

module.exports = router;
