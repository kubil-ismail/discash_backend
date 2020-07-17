const router = require('express').Router()
const { topUp } = require('../../../controller/transaction/topup.controller')

// routes
router.get('/?', topUp)

module.exports = router
