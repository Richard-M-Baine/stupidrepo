const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes')
const groupRoutes = require('./groupRoutes')

router.use('/users', userRoutes);
router.use('/authenticate', loginRoutes);
router.use('/groups', groupRoutes)



module.exports = router;
