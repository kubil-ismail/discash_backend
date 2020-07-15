const profileModel = require('../../model/user/user.detail')

module.exports = {
  getProfile: async (req, res) => {
    const { id } = req.params
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
      const deleteProfile = await profileModel.deleteUsers({ id: parseInt(id) })
      if (deleteProfile) {
        const data = {
          success: true,
          msg: 'user deleted',
        }
        res.status(200).send(data)
      } else {
        const data = {
          success: false,
          msg: 'delete failed'
        }
        res.status(500).send(data)
      }
    }
  },
  editProfile: async (req, res) => {
    const { id } = req.params
    const {fullname, phone, gender, birthdate} = req.body
    const result = await profileModel.getProfile({ id: parseInt(id)})

    if (result.length < 1) {
      data = {
        success: false,
        msg: 'Profile not found'
      }
      res.status(400).send(data)
    } else {
      const editData = {
            fullname,
            phone,
            gender,
            birthdate,
            id: parseInt(id)
          }

      const editProfile = await profileModel.editProfile(editData)
      if (editProfile) {
        data = {
          success: true,
          msg: 'Edit success',
          data: editData
        }
        res.status(200).send(data)
      } else {
        data = {
          success: false,
          msg: 'Edit failed'
        }
        res.status(500).send(data)
      }
    }
  },
}