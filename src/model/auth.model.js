const db = require("../util/database");
const table = "users";

module.exports = {
  findEmail: (data) => {
    const query = `SELECT email FROM ${table} WHERE ?`;

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) =>
        err ? reject(Error(err)) : resolve(res.length)
      );
    });
  },
  findAccount: (data) => {
    const query = `SELECT * FROM ${table} WHERE ?`;

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) =>
        err ? reject(Error(err)) : resolve(res[0])
      );
    });
  },
  findCode: (data) => {
    const query = `DELETE FROM user_activates WHERE user_email = '${data.email}' AND code = '${data.code}' `;
    return new Promise((resolve, reject) => {
      db.query(query, (err, res) => (err ? reject(Error(err)) : resolve(res)));
    });
  },
  createUser: (data) => {
    const query = `INSERT INTO ${table} SET ?`;

    return new Promise((resolve, reject) => {
      db.query(query, data, (err, res) =>
        err ? reject(Error(err)) : resolve(res)
      );
    });
  },

  // updateUser:(data)=>{
  //   const query=`UPDATE users SET `
  // }
};
