const transactionModel = require('../../model/transaction/transaction.model')
const response = require('../../helper/response')

module.exports = {
  getTransactionUser: async (req, res) => {
    try {
      const { id } = req.params
      const findUser = await transactionModel.findUser({ id: parseInt(id) })
      if (findUser) {
        const result = await transactionModel.getTransactionsUser({ id: parseInt(id) })
        res.status(200).send(response({
          status: true,
          msg: 'get detail transaction user',
          data: result
        }))
      } else {
        res.status(400).send(response({
          msg: 'Not found transactions'
        }))
      }
    } catch (error) {
      res.status(400).send(response({
        msg: 'Something wrong, Try again'
      }))
    }
  }
}
