const router = require('express').Router()
const userController = require('../../controller/user/user.detail')
const { getProfile, deleteProfile, editProfile } = userController

router
	.get('/:id?', getProfile)
	.patch('/:id', editProfile)
	.delete('/:id', deleteProfile)

module.exports = router
