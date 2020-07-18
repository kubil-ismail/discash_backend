const router = require('express').Router()
const { pay } = require('../../../controller/transaction/pay.controller')
const { _authApi } = require('../../../middleware/auth.middleware');
const { _payMiddleware } = require('../../../middleware/pay.middleware');

// routes
router.post('/', _authApi, _payMiddleware, pay)

module.exports = router
