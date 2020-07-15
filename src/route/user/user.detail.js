const router = require('express').Router()
const userController = require('../../controller/user/user.detail')
const { getProfile } = userController

router
	.get('/', getProfile)

module.exports = router
