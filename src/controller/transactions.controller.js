const transactionModel = require('../model/transactions.models')
const response = require('../helper/response')

module.exports = {
  getTransactionUser: async (req, res) => {
    const { id } = req.params
    console.log(id)
    const findUser = await transactionModel.findUser({ id: parseInt(id) })
    const transactionsData = await transactionModel.getTransactionsUser({ id: parseInt(id) })

    try {
      if (findUser.length > 0) {
        transactionsData.then((result) => {
          res.status(200).send(response(
            true, 'Get detail transaction success', result

          ))
        })
      } else {
        res.status(400).send(response(
          false, 'Not found detail transaction'
        ))
      }
    } catch {
      res.status(400).send(response(
        false, 'Failed get detail transactions'
      ))
    }
  }
}
