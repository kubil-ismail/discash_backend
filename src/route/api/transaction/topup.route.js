const router = require('express').Router()
const { topUp } = require('../../../controller/transaction/topup.controller')
const { _authApi } = require('../../../middleware/auth.middleware')
const { _topupMiddleware } = require('../../../middleware/topup.middleware')

// routes
router.get('/?', _authApi, _topupMiddleware, topUp)

module.exports = router
