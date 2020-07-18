const transactionModel = require('../../model/transaction/transaction.model')
const response = require('../../helper/response')
const pagination = require('../../util/pagination')
const { APP_URL } = process.env

module.exports = {
  getAllTransactions: async (req, res) => {
    try {
      const { page, limit, search, sort } = req.query
      const condition = {
        search,
        sort
      }
      const sliceStart = (pagination.getPage(page) * pagination.getPerPage(limit)) - pagination.getPerPage(limit)
      const sliceEnd = (pagination.getPage(limit) * pagination.getPerPage(limit)) - sliceStart
      const totalData = await transactionModel.countTransactions(condition)
      const totalPage = Math.ceil(totalData / pagination.getPerPage(limit))
      const prevLink = pagination.getPrevLink(pagination.getPage(page), req.query)
      const nextLink = pagination.getNextLink(pagination.getPage(page), totalPage, req.query)
      const result = await transactionModel.getAllTransactions(sliceStart, sliceEnd, condition) // get all transactions
      if (result) {
        res.status(200).send(response({
          status: true,
          msg: 'get detail transaction user',
          data: result,
          options: {
            pageInfo: {
              page: pagination.getPage(page),
              totalPage,
              perPage: pagination.getPerPage(limit),
              totalData,
              nextLink: nextLink && `${APP_URL}transactions?${nextLink}`,
              prevLink: prevLink && `${APP_URL}transactions?${prevLink}`
            }
          }
        }))
      } else {
        res.status(400).send(response({
          status: false,
          msg: 'Transaction not found'
        }))
      }
    } catch (error) {
      res.status(200).send(response({
        status: false,
        msg: 'Get transaction failed'
      }))
    }
  },
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
          status: false,
          msg: 'Not found transactions'
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
