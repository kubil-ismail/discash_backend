const db = require('../../util/DB')
const table = "user_details"
const table2 = "users"

module.exports = {
	getProfile: (data) => {
	    let query = `SELECT ${table}.id, ${table}.user_id, ${table}.fullname,
	    	${table}.phone, ${table}.gender, ${table}.birthdate, users.email FROM ${table} `
	    query += 'INNER JOIN users ON user_details.user_id = users.id ' // Join Table Query
	    query += `WHERE users.status LIKE '1%'`

	    // If id not null
	    if (data.id) {
	      query += `WHERE ${table}.user_id LIKE '${data.id}%'`
	    }

	    return new Promise((resolve, reject) => {
	      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
	    })
  	},
  	getUserById: (data) => {
	    const query = `SELECT * FROM ${table2} WHERE id = '${data.id}'`

		return new Promise((resolve, reject) => {
	      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
	    })
  	},
  	updateUsers: (data) => {
  		// set status to false
	    const query = `UPDATE ${table2} SET status = 0 WHERE id = '${data.id}'`

	    return new Promise((resolve, reject) => {
	      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
	    })
  	}
}