const router = require('express').Router()
const transactionsController = require('../../controller/transactions.controller')
const { getTransactionUser } = transactionsController

// routes
router.get('/user/:id', getTransactionUser)

module.exports = router
