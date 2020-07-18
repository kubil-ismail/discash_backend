const router = require('express').Router()
const { getTransferUserHistory, transferMoney } = require('../../../controller/transaction/transfer.controller')
const { _authApi } = require('../../../middleware/auth.middleware')
const { _transferMiddleware } = require('../../../middleware/transfer.middleware')

// routes
router.get('/money/?', _authApi, _transferMiddleware, transferMoney)
router.get('/history/:id', _authApi, getTransferUserHistory)

module.exports = router
