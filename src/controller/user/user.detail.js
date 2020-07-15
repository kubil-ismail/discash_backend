const profileModel = require('../../model/user/user.detail')

module.exports = {
  getProfile: async (req, res) => {
    const { id } = req.query
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
}
