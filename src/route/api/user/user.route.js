const router = require('express').Router()
const {
  getProfile,
  editProfile,
  editAvatar,
  deleteProfile
} = require('../../../controller/user/user.controller')

router
  .get('/:id?', getProfile)
  .patch('/:id', editProfile)
  .patch('/avatar/:id', editAvatar)
  .delete('/:id', deleteProfile)

module.exports = router
