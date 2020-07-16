const router = require('express').Router()
const { getTransactionUser } = require('../../controller/transactions.controller')

// routes
router.get('/user/:id', getTransactionUser)

module.exports = router
