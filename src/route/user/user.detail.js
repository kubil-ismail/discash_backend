const router = require('express').Router()
const userController = require('../../controller/user/user.detail')
const { getProfile, deleteProfile } = userController

router
	.get('/', getProfile)
	.delete('/:id', deleteProfile)

module.exports = router
