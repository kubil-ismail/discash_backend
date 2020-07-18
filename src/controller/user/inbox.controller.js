const inboxModel = require('../../model/user/inbox.model')
const response = require('../../helper/response')

module.exports = {
getInboxUser: async (req, res) => {
    try {
      const { id } = req.params
      const findUser = await inboxModel.findUser({ id: parseInt(id) })
      if (findUser) {
        const result = await inboxModel.getInboxUser({ id: parseInt(id) })
        res.status(200).send(response({
          status: true,
          msg: 'Get inbox user',
          data: result
        }))
      } else {
        res.status(400).send(response({
          status: false,
          msg: 'Not found inbox'
        }))
      }
    } catch (error) {
      res.status(400).send(response({
        status: false,
        msg: 'Something wrong, Try again'
      }))
    }
  }
}