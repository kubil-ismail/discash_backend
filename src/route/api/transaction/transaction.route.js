const router = require('express').Router()
const { getTransactionUser, getAllTransactions } = require('../../../controller/transaction/transaction.controller')

// routes
router.get('/', getAllTransactions)
router.get('/user/:id', getTransactionUser)

module.exports = router
