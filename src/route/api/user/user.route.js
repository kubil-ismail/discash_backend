const router = require('express').Router()
const {
  getProfile,
  editProfile,
  editAvatar,
  deleteProfile
} = require('../../../controller/user/user.controller')
const {getInboxUser} = require('../../../controller/user/inbox.controller')

router
  .get('/:id?', getProfile)
  .get('/inbox/:id', getInboxUser)
  .patch('/:id', editProfile)
  .patch('/avatar/:id', editAvatar)
  .delete('/:id', deleteProfile)

module.exports = router
