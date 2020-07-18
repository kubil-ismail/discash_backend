const router = require('express').Router()
const { topUp } = require('../../../controller/transaction/topup.controller')

// routes
router.post('/', topUp)

module.exports = router
