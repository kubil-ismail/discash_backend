const db = require('../../util/DB')
const table = "user_details"
const table2 = "users"

module.exports = {
	getProfile: (data) => {
	    let query = `SELECT user_details.*, users.email FROM users `
	    query += 'INNER JOIN user_details ON user_details.user_id = users.id ' // Join Table Query

	    // If id not null
	    if (data.id) {
	      query += `WHERE users.id = '${data.id}%' AND users.deleted = 0`
	    } else {
	      query += `WHERE users.deleted = 0`
	    }

	    return new Promise((resolve, reject) => {
	      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
	    })
  	},
  	deleteUsers: (data) => {
  		// set status to false
	    const query = `UPDATE users SET deleted = 1 WHERE id = '${data.id}'`

	    return new Promise((resolve, reject) => {
	      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
	    })
  	},
  	editProfile: (data) => {
  		// update user data in table user_details
  		const { id, fullname, phone, gender, birthdate } = data
	    const query = `UPDATE user_details 
	    	SET fullname = '${fullname}',
	    		phone = '${phone}',
	    		gender = '${gender}',
	    		birthdate = '${birthdate}'
	    	WHERE user_id = '${id}'`

	    return new Promise((resolve, reject) => {
	      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
	    })
  	},
}