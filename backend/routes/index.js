const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes')
const groupRoutes = require('./groupRoutes')
const requestRoutes = require('./requestRoutes')
const messageRoutes = require('./messageRoutes')

router.use('/users', userRoutes);
router.use('/authenticate', loginRoutes);
router.use('/groups', groupRoutes)
router.use('/requests', requestRoutes)
router.use('/messages', messageRoutes)


module.exports = router;
