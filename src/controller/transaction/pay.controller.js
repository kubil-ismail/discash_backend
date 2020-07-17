const payModel = require('../../model/transaction/pay.model')
const response = require('../../helper/response')

module.exports = {
  // Get user profile from db
  pay: async (req, res) => {
    try {
      const { payment, userid, name, price } = req.body
      const dataSuccess = {
        payment_method_id: payment,
        user_id: userid,
        name,
        price,
        type_id: '3'
      }
      const dataFailed = {
        payment_method_id: payment,
        user_id: userid,
        name,
        price,
        type_id: '3',
        status: '2'
      }
      const findUser = await payModel.findUser({ id: parseInt(userid) })
      if (findUser.length && findUser[0].amounts >= price) {
        await payModel.pay(dataSuccess)
        res.status(200).send(response({
          status: true,
          msg: 'Pay success'
        }))
      } else {
        await payModel.pay(dataFailed)
        res.status(400).send(response({
          msg: 'Pay failed'
        }))
      }
    } catch (error) {
      res.status(400).send(response({
        msg: 'Something wrong, Try again'
      }))
    }
  }
}
