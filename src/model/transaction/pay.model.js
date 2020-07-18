const db = require('../../util/database')
const table = 'transactions'
const table2 = 'accounts'

module.exports = {
  findUser: (data) => {
    const query = `SELECT * FROM ${table2} WHERE user_id = ? AND status = 1 AND deleted = 0`
    return new Promise((resolve, reject) => {
      db.query(query, data.id, (err, res) => err ? reject(Error(err)) : resolve(res.length))
    })
  },
  pay: (data) => {
    const query = `INSERT INTO ${table} SET ?`
    return new Promise((resolve, reject) => {
      if (data) {
        db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
      } else {
        db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
      }
    })
  }
}
