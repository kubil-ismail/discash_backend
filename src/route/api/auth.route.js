const router = require('express').Router()
const { activate, pin, forgot } = require('../../controller/auth.controller')
const { _activate, _pin, _forgot } = require('../../middleware/auth.middleware')

// routes
router
  .get('/pin', _pin, pin)
  .post('/activate', _activate, activate)
  .post('/forgot', _forgot, forgot)

module.exports = router
