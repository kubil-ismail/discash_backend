const db = require('../../util/DB')

module.exports = {
	updateImage: (data) => {
  		// update user data in table user_details
  		const { picture, id } = data
	    const query = `UPDATE user_details 
	    	SET picture = '${picture}' WHERE user_id = '${id}'`

	    return new Promise((resolve, reject) => {
	      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res.affectedRows))
	    })
  	},
}