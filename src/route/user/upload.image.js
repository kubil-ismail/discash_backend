const router = require('express').Router()
const userController = require('../../controller/user/upload.image')
const { uploadImage, getUserDetail } = userController

router
	.get('/', getUserDetail)
	.post('/', uploadImage)

module.exports = router
