const db = require('../../util/database')
const table = 'transactions'
const table2 = 'users'
const table3 = 'payment_methods'
const table4 = 'user_details'

module.exports = {
  findUser: (data) => {
    const query = `SELECT * FROM ${table} WHERE user_id = ?`
    return new Promise((resolve, reject) => {
      db.query(query, data.id, (err, res) => err ? reject(Error(err)) : resolve(res.length))
    })
  },
  countTransactions: (data) => {
    const query = `SELECT COUNT(transactions.id) as total
                    FROM transactions
                    JOIN payment_methods ON payment_methods.id = transactions.payment_method_id
                    JOIN users ON users.id = transactions.user_id
                    JOIN user_details ON user_details.user_id = users.id
                    WHERE transactions.date LIKE '%${data.search || ''}%'
                    ORDER BY transactions.date ${parseInt(data.sort) ? 'DESC' : 'ASC'}`
    return new Promise((resolve, reject) => {
      db.query(query, (error, results) => {
        if (error) {
          reject(Error(error).total)
        }
        resolve(results[0].total)
      })
    })
  },
  getAllTransactions: (start, end, data) => {
    const query = `SELECT transactions.id,
                          transactions.date,
                          payment_methods.name as payment,
                          users.id as userid,
                          user_details.fullname,
                          transactions.name as name_transaction,
                          transactions.price,
                          transactions.qty,
                          transactions.type,
                          transactions.status
                    FROM transactions
                    JOIN payment_methods ON payment_methods.id = transactions.payment_method_id
                    JOIN users ON users.id = transactions.user_id
                    JOIN user_details ON user_details.user_id = users.id
                    WHERE transactions.date LIKE '%${data.search || ''}%'
                    ORDER BY transactions.date ${parseInt(data.sort) ? 'DESC' : 'ASC'} LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(query, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },

  getTransactionsUser: (data) => {
    const query = `SELECT transactions.id, 
                        transactions.date, 
                        payment_methods.name,
                        users.id as userid,
                        user_details.fullname,
                        transactions.name as name_transactions,
                        transactions.price,
                        transactions.qty,
                        transactions.type,
                        transactions.status
                    FROM ${table}
                    JOIN ${table2} ON users.id = transactions.user_id
                    JOIN ${table3} ON payment_methods.id = transactions.payment_method_id
                    JOIN ${table4} ON user_details.user_id = users.id
                    WHERE transactions.user_id = ? AND transactions.deleted = 0`

    return new Promise((resolve, reject) => {
      if (data.id) {
        db.query(query, data.id, (err, res) => err ? reject(Error(err)) : resolve(res))
      } else {
        db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
      }
    })
  }
}
