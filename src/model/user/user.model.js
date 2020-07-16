const db = require('../../util/database')
const table = 'user_details'
const table2 = 'users'
const table3 = 'roles'
const table4 = 'accounts'

module.exports = {
  getProfile: (data) => {
    let query = `SELECT ${table}.*, ${table2}.email, ${table2}.status,
      ${table3}.name AS role_name, ${table4}.number as number_account,
      ${table4}.amounts as amounts, ${table4}.bank_id FROM ${table2} `
    query += `RIGHT JOIN ${table} ON ${table}.user_id = users.id ` // Join Table Query
    query += `JOIN ${table3} ON ${table3}.id = users.role_id ` // Join Table Query
    query += `JOIN ${table4} ON ${table4}.user_id = users.id ` // Join Table Query
    query += `WHERE ${table}.deleted = 0 `

    // Get one profile
    if (data.id) {
      query += `AND ${table}.user_id = ${data.id}`
    }

    return new Promise((resolve, reject) => {
      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
    })
  },
  findProfile: (data) => {
    let query = `SELECT ${table}.user_id FROM ${table} `
    query += `WHERE ${table}.user_id = ${data.id}`

    return new Promise((resolve, reject) => {
      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
    })
  },
  updateProfile: (data) => {
    const query = `UPDATE ${table} SET ? WHERE ?`

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
    })
  },
  deleteProfile: (data) => {
    const query = `UPDATE ${table} SET deleted = 1 WHERE user_id = ${data.id}`

    return new Promise((resolve, reject) => {
      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
    })
  }
}
