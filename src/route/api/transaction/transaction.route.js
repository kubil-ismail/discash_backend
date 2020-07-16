const router = require('express').Router()
const { getTransactionUser } = require('../../../controller/transaction/transaction.controller')

// routes
router.get('/user/:id', getTransactionUser)

module.exports = router
