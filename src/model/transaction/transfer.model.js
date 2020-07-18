const db = require("../../util/database");
const table = "transactions";
const table1 = "users";
const table2 = "accounts";
const table3 = "payment_methods";
const table4 = "user_details";
const table5 = "transaction_types";

module.exports = {
  findUser: (data) => {
    const query = `SELECT * FROM ${table2} WHERE nmbr = ? AND status = 1 AND deleted = 0`; //ubah to number_account
    return new Promise((resolve, reject) => {
      db.query(query, data.id, (err, res) =>
        err ? reject(Error(err)) : resolve(res)
      );
    });
  },
  getTransferUserHistory: (data) => {
    const query = `SELECT transactions.id, 
                        transactions.date, 
                        payment_methods.name,
                        users.id as userid,
                        user_details.fullname,
                        transactions.name as name_transactions,
                        transactions.price,
                        transactions.qty,
                        transaction_types.name as type,
                        transactions.status
                    FROM ${table}
                    JOIN ${table1} ON users.id = transactions.user_id
                    JOIN ${table3} ON payment_methods.id = transactions.payment_method_id
                    JOIN ${table4} ON user_details.user_id = users.id
                    JOIN ${table5} ON transaction_types.id = transactions.type_id
                    WHERE transactions.user_id = ? AND transactions.deleted = 0 and transactions.type_id = 2`;

    return new Promise((resolve, reject) => {
      if (data.id) {
        db.query(query, data.id, (err, res) =>
          err ? reject(Error(err)) : resolve(res)
        );
      } else {
        db.query(query, (err, res) =>
          err ? reject(Error(err)) : resolve(res)
        );
      }
    });
  },
  transferMoney: (data) => {
    const query = `INSERT INTO ${table} SET ?`;
    return new Promise((resolve, reject) => {
      if (data) {
        db.query(query, data, (err, res) =>
          err ? reject(Error(err)) : resolve(res)
        );
      } else {
        db.query(query, (err, res) =>
          err ? reject(Error(err)) : resolve(res)
        );
      }
    });
  },
};
