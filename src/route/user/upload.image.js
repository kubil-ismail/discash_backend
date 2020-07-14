const router = require('express').Router()
const userController = require('../../controller/user/upload.image')
const {uploadImage} = userController

router.post('/', uploadImage)

module.exports = router
