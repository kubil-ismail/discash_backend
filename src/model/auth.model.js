const db = require("../utils/database");
const table = "users";

module.exports = {
  findUser: (data) => {
    const query = `SELECT * FROM ${table} WHERE ?`;
    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) =>
        err ? reject(Error(err)) : resolve(res[0])
      );
    });
  },
};
