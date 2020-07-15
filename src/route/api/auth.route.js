const router = require('express').Router()
const { activate, pin } = require('../../controller/auth.controller')
const { _activate, _pin } = require('../../middleware/auth.middleware')

// routes
router.get('/pin', _pin, pin)
router.post('/activate', _activate, activate)

module.exports = router
