const profileModel = require('../../model/user/user.detail')
const moment = require('moment')

module.exports = {
  getProfile: async (req, res) => {
    const { id } = req.params
    console.log(id)
    const result = await profileModel.getProfile({ id: parseInt(id)})

    if (result.length < 1) {
      data = {
        success: false,
        msg: 'Profile not found'
      }
      res.status(400).send(data)
    } else {
      data = {
        success: true,
        msg: 'Profile found',
        data: result
      }
      res.status(200).send(data)
    }
  },
  deleteProfile: async (req, res) => {
    const {id} = req.params
    const result = await profileModel.getProfile({ id: parseInt(id)})

    if (result.length < 1) {
      data = {
        success: false,
        msg: 'Profile not found'
      }
      res.status(400).send(data)
    } else {
      const deleteProfile = await profileModel.updateUsers({ id: parseInt(id) })
      if (deleteProfile) {
        const data = {
          success: true,
          msg: 'user not actived',
        }
        res.status(200).send(data)
      } else {
        const data = {
          success: false,
          msg: 'not active user'
        }
        res.status(500).send(data)
      }
    }
  }
}
