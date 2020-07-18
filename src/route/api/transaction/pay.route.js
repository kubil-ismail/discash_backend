const router = require('express').Router()
const { pay } = require('../../../controller/transaction/pay.controller')

// routes
router.post('/', pay)

module.exports = router
