const db = require('../util/database')
const table = 'transactions'
const table2 = 'users'
const table3 = 'payment_methods'

module.exports = {
  findUser: (data) => {
    const query = `SELECT user_id FROM ${table} WHERE ?`
    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.length))
    })
  },
  getTransactionsUser: (data) => {
    const query = `SELECT transactions.id, 
                        transactions.date, 
                        payment_methods.name,
                        users.name as name_user,
                        transactions.name as name_transactions,
                        transactions.price,
                        transactions.qty,
                        transactions.type,
                        transactions.status
                    JOIN ${table2} ON users.id = transactions.user_id
                    JOIN ${table3} ON payment_methods.id = transactions.payment_method_id  
                    FROM ${table} ${parseInt(data.id) ? 'WHERE ? AND deleted = 0' : ''}`

    return new Promise((resolve, reject) => {
      if (data.id) {
        db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
      } else {
        db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
      }
    })
  }
}
