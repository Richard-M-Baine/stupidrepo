const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes')
const groupRoutes = require('./groupRoutes')
const requestRoutes = require('./requestRoutes')
const messageRoutes = require('./messageRoutes')
const locationRoutes = require('./locationRoutes')
const mapRoutes = require('./mapRoutes')

router.use('/users', userRoutes);
router.use('/authenticate', loginRoutes);
router.use('/groups', groupRoutes)
router.use('/requests', requestRoutes)
router.use('/messages', messageRoutes)
router.use('/locations', locationRoutes)
router.use('/maps', mapRoutes)


module.exports = router;
