const db = require('../../util/DB')

module.exports = {
	getAllUser: () => {
		const sql = `SELECT * FROM user_details`
		
		return new Promise((resolve, reject) => {
	      db.query(sql, (error, result) => {
	        if (error) {
	          reject(Error(error))
	        }
	        resolve(result)
	      })
	    })
	}
}