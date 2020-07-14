const router = require('express').Router()
const { activate } = require('../../controller/auth.controller')
const { _activate } = require('../../middleware/auth.middleware')

// routes
router
  .post('/activate', _activate, activate)

module.exports = router
