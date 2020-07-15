const db = require('../util/database')
const table = 'users' // Main Table
const table2 = 'user_activates' // user_activates

module.exports = {
  // Activate Account
  activate: (data) => {
    const query = `UPDATE ${table} SET status = 1 WHERE email = '${data.email}'`

    return new Promise((resolve, reject) => {
      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
    })
  },

  // Find email from table
  findCode: (data) => {
    const query = `DELETE FROM ${table2} WHERE email = '${data.email}' AND code = '${data.pin}' `

    return new Promise((resolve, reject) => {
      db.query(query, (err, res) => {
        err ? reject(Error(err)) : resolve(res)
      })
    })
  },

  // Find pin from user table
  findPin: (data) => {
    const query = `SELECT pin FROM ${table} WHERE pin = ${data.pin} AND id = ${data.userId}`

    return new Promise((resolve, reject) => {
      db.query(query, (err, res) => {
        err ? reject(Error(err)) : resolve(res)
      })
    })
  },

  // Create new activate account key
  createActivator: (data) => {
    const query = `INSERT INTO ${table2} SET ?`

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) => {
        err ? reject(Error(err)) : resolve(res)
      })
    })
  }
}
