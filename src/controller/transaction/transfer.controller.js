const transferModel = require('../../model/transaction/transfer.model')
const response = require('../../helper/response')

module.exports = {
  // Get user profile from db
  getTransferUserHistory: async (req, res) => {
    try {
      const { id } = req.params
      const findUser = await transferModel.findUser({ id: parseInt(id) })
      if (findUser) {
        const result = await transferModel.getTransferUserHistory({ id: parseInt(id) })
        res.status(200).send(response({
          status: true,
          msg: 'Get history transfer',
          data: result
        }))
      } else {
        res.status(400).send(response({
          status: false,
          msg: 'Not found transfer history'
        }))
      }
    } catch (error) {
      res.status(400).send(response({
        status: false,
        msg: 'Something wrong, Try again'
      }))
    }
  },

  transferMoney: async (req, res) => {
    try {
      const { payment, userid, account_number, price } = req.query
      const dataSuccess = {
        payment_method_id: payment,
        user_id: userid,
        price,
        account_number,
        type_id: '2'
      }
      const dataFailed = {
        payment_method_id: payment,
        user_id: userid,
        price,
        account_number,
        type_id: '2',
        status: '2'
      }
      console.log(dataSuccess)
      const findUser = await transferModel.findUser({ id: parseInt(userid) })
      if (findUser) {
        await transferModel.transferMoney(dataSuccess)
        res.status(200).send(response({
          status: true,
          msg: 'Transfer account success'
        }))
      } else {
        await transferModel.transferMoney(dataFailed)
        res.status(400).send(response({
          msg: 'No Found User for transfer'
        }))
      }
    } catch (error) {
      res.status(400).send(response({
        msg: 'Something wrong, Try again'
      }))
    }
  }
}
