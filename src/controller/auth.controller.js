require("dotenv").config();
const { APP_KEY, APP_PIN } = process.env;
const authModel = require("../models/authModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const response = require("../helper/response");

module.exports = {
  loginAuth: (req, res) => {
    const { email, password, pin_id, satus, rolle } = req.body;
    const checkLogin = authModel.findAccount({ email: email });

    // Check email
    checkLogin
      .then((_result) => {
        // Check account status
        if (!_result.activate) {
          res
            .status(400)
            .send(response(false, "Please activate your account !"));
        } else {
          // Check Password
          const checkPassword = bcrypt.compareSync(password, _result.password);
          if (checkPassword) {
            // Create Api Key
            jwt.sign({ _result }, APP_KEY, (err, token) => {
              if (!err) {
                res.status(200).send(
                  response(true, "Login successful", {
                    apiKey: token,
                    userId: _result.id,
                    role: _result.role_id,
                  })
                );
              } else {
                res
                  .status(400)
                  .send(
                    response(
                      false,
                      "Unable to sign in at this time, try for a few moments"
                    )
                  );
              }
            });
          } else {
            res.status(400).send(response(false, "Password do not match"));
          }
        }
      })
      .catch((_) =>
        res
          .status(400)
          .send(res.status(400).send(response(false, "Email not registered")))
      );
  },
};
