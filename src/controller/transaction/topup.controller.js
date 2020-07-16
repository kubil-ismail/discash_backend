const topUpModel = require('../../model/transaction/topup.model')
const response = require('../../helper/response')

module.exports = {
  // Get user profile from db
  topUp: async (req, res) => {
    try {
      const {
        date,
        payment,
        userid,
        name,
        price,
        qty,
        type
      } = req.body
      const data = {
        date,
        payment_method_id: payment,
        user_id: userid,
        name,
        price,
        qty,
        type
      }
      const findUser = await topUpModel.findUser({ id: parseInt(userid) || null })
      if (findUser.length > 0) {
        await topUpModel.topUp(data)
        res.status(200).send(response({
          status: true,
          msg: 'success top up'
        }))
      } else {
        res.status(400).send(response({
          msg: 'No Found User for top up'
        }))
      }
    } catch (error) {
      res.status(400).send(response({
        msg: 'Something wrong, Try again'
      }))
    }
  }
}
