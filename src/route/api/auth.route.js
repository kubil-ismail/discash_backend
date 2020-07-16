const router = require('express').Router()
const { activate, pin, forgot, login, register } = require('../../controller/auth.controller')
const { _activate, _pin, _forgot, _login, _register } = require('../../middleware/auth.middleware')

// routes
router
  .get('/pin', _pin, pin)
  .post('/login', _login, login)
  .post('/register', _register, register)
  .post('/activate', _activate, activate)
  .post('/forgot', _forgot, forgot)

module.exports = router
