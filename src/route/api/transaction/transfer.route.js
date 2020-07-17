const router = require('express').Router()
const { getTransferUserHistory, transferMoney } = require('../../../controller/transaction/transfer.controller')

// routes
router.get('/money/?', transferMoney)
router.get('/history/:id', getTransferUserHistory)

module.exports = router
