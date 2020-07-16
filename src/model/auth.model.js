const db = require('../util/database')
const table = 'users' // Main Table
const table2 = 'user_activates' // user_activates
const table3 = 'user_forgotes' // user_forgotes

module.exports = {
  // Activate Account
  activate: (data) => {
    const query = `UPDATE ${table} SET status = 1 WHERE email = '${data.email}'`

    return new Promise((resolve, reject) => {
      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
    })
  },

  // Find email from table
  findEmail: (data) => {
    const query = `SELECT email FROM ${table} WHERE ?`

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) =>
        err ? reject(Error(err)) : resolve(res.length)
      )
    })
  },

  // Find user from table
  findAccount: (data) => {
    const query = `SELECT * FROM ${table} WHERE ?`

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) =>
        err ? reject(Error(err)) : resolve(res[0])
      )
    })
  },

  // Find Code from table
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
  },

  // Create new forgot request
  createForgot: (data) => {
    const query = `INSERT INTO ${table3} SET ?`

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) => {
        err ? reject(Error(err)) : resolve(res)
      })
    })
  },

  // Create new user
  createUser: (data) => {
    const query = `INSERT INTO ${table} SET ?`

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) =>
        err ? reject(Error(err)) : resolve(res)
      )
    })
  }
}
