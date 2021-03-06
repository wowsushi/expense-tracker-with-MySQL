const express = require('express')
const router = express.Router()

router.use('/', require('./home'))
router.use('/records', require('./records.js'))
router.use('/users', require('./users.js'))
router.use('/auth', require('./auths.js'))
router.use('/analyse', require('./analyse.js'))

module.exports = router