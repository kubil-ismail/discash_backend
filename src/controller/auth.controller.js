require("dotenv").config();
const { APP_KEY, APP_PIN } = process.env;
const authModel = require("../model/auth.model");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const response = require("../helper/response");

module.exports = {
  loginAuth: (req, res) => {
    const { email, password, pin_id } = req.body;
    const checkLogin = authModel.findAccount({ email: email });

    // Check email
    checkLogin
      .then((_result) => {
        console.log(_result);
        // Check account status
        if (!_result.status) {
          res
            .status(400)
            .send(response(false, "Please activate your account !"));
        } else {
          // Check Password
          const checkPassword = bcrypt.compareSync(password, _result.password);
          //const checkPassword = password === _result.password;

          if (checkPassword) {
            // Create Api Key
            jwt.sign({ _result }, APP_KEY, (err, token) => {
              if (!err) {
                res.status(200).send(
                  response(true, "Login successful", {
                    apiKey: token,
                    userId: _result.id,
                    rolle: _result.rolle_id,
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
  registerAuth: (req, res) => {
    const { email, password, pin_id } = req.body;
    const checkPin = pin_id ? bcrypt.compareSync(pin_id, APP_PIN) : null;
    const checkEmail = authModel.findEmail({ email: email });
    const uniqid = Math.floor(1000 + Math.random() * 9000);

    // Check Email if exist
    checkEmail.then((_result) => {
      if (!_result) {
        const data = {
          email: email,
          password: bcrypt.hashSync(password, salt),
          // role_id: checkPin ? 2 : 1,
          pin_id: pin_id,
        };
        console.log("password register: ", password);

        const createUser = authModel.createUser(data);
        createUser
          .then((_result) => {
            // console.log("result register=>", _result);

            res.status(200).send(
              response(true, "Registration successful", {
                userId: _result.insertId,
                email: email,
              })
            );
          })
          .catch((_) => {
            res.status(400).send(response(false, "Registration successful"));
          })

          .catch((_) => {
            res.status(400).send(response(false, "Email failed to send"));
          });
      } else {
        res.status(400).send(response(false, "Email already registered"));
      }
    });
  },
};
