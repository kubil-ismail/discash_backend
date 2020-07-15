const router = require('express').Router()
const userController = require('../../controller/user/upload.image')
const { uploadImage } = userController

router
	.patch('/:id', uploadImage)

module.exports = router
