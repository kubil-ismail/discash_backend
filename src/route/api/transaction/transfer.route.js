const router = require('express').Router()
const { transferMoney } = require('../../../controller/transaction/transfer.controller')

// routes
router.get('/money/?', transferMoney)

module.exports = router
