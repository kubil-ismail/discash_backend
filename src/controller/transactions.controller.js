const transactionModel = require('../model/transactions.models')
const response = require('../helper/response')

module.exports = {
  getTransactionUser: async (req, res) => {
    try {
      const { id } = req.params
      const findUser = await transactionModel.findUser({ id: parseInt(id) })
      const result = await transactionModel.getTransactionsUser({ id: parseInt(id) })
      if (findUser.length !== 0) {
        res.status(200).send(response({
          status: true,
          msg: 'Success get profile',
          data: result
        }))
      } else {
        res.status(400).send(response({
          msg: 'User not found'
        }))
      }
    } catch (error) {
      res.status(400).send(response({
        msg: 'Something wrong, Try again'
      }))
    }
  }
}
