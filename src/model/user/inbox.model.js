const db = require('../../util/database')
const table = 'inbox'
const table1 = 'users'

module.exports = {
  findUser: (data) => {
    const query = `SELECT * FROM users WHERE id = ? AND status = 1`
    return new Promise((resolve, reject) => {
      db.query(query, data.id, (err, res) => err ? reject(Error(err)) : resolve(res.length))
    })
  },
  getInboxUser: (data) => {
    const query = `SELECT users.id as userid, 
                        inbox.title, 
                        inbox.description,
                        inbox.status
                    FROM ${table}
                    JOIN ${table1} ON users.id = inbox.user_id
                    WHERE inbox.user_id = ? AND inbox.deleted = 0`

    return new Promise((resolve, reject) => {
      if (data.id) {
        db.query(query, data.id, (err, res) => err ? reject(Error(err)) : resolve(res))
      } else {
        db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
      }
    })
  },
}
