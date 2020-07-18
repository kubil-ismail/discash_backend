require("dotenv").config();
const { APP_KEY } = process.env;
const auth = require("../model/auth.model");
const response = require("../helper/response");
const forgotEmail = require("../util/emailForgot");
const verifyEmail = require("../util/emailVerify");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

module.exports = {
  // Login account
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await auth.findAccount({ email: email });
      if (check !== undefined || check) {
        if (check.status === 1) {
          // Check password
          const checkPassword = bcrypt.compareSync(password, check.password);
          if (checkPassword) {
            jwt.sign({ check }, APP_KEY, (err, token) => {
              if (!err) {
                res.status(200).send(
                  response({
                    status: true,
                    msg: "Login successful",
                    data: {
                      apiKey: token,
                      userId: check.id,
                      role: check.role_id,
                    },
                  })
                );
              } else {
                res.status(400).send(
                  response({
                    msg:
                      "Unable to sign in at this time, try for a few moments",
                  })
                );
              }
            });
          } else {
            res.status(400).send(
              response({
                msg: "Password do not match",
              })
            );
          }
        } else {
          res.status(400).send(
            response({
              msg: "Please activate your account !",
            })
          );
        }
      } else {
        res.status(400).send(
          response({
            msg: "Email not registered",
          })
        );
      }
    } catch (error) {
      console.log(error);

      res.status(400).send(
        response({
          msg: "Something wrong, Try again",
        })
      );
    }
  },

  // Create new user
  register: async (req, res) => {
    try {
      const { email, password, pin } = req.body;
      const code = Math.floor(1000 + Math.random() * 9000);
      const checkEmail = await auth.findEmail({ email: email });
      if (!checkEmail) {
        const data = {
          email: email,
          password: bcrypt.hashSync(password, salt),
          pin: pin,
        };
        const createUser = await auth.createUser(data);
        console.log(createUser);

        if (createUser.affectedRows) {
          await verifyEmail({ email: email, code: code });
          res.status(200).send(
            response({
              msg: "Registration successful",
            })
          );
        } else {
          res.status(400).send(
            response({
              msg: "Something wrong, Try again",
            })
          );
        }
      } else {
        res.status(400).send(
          response({
            msg: "Email already registered",
          })
        );
      }
    } catch (error) {
      console.log("error di line 112", error);

      res.status(400).send(
        response({
          msg: "Something wrong, Try again",
        })
      );
    }
  },

  // Activate account
  activate: async (req, res) => {
    try {
      const { email, pin } = req.body;
      const check = await auth.findCode({ email: email, pin: pin });
      if (check.affectedRows < 1) {
        res.status(400).send(
          response({
            msg: "Invalid Pin",
          })
        );
      } else {
        const activate = await auth.activate({ email: email });
        if (activate) {
          res.status(200).send(
            response({
              status: true,
              msg: "Activation successful",
            })
          );
        } else {
          res.status(400).send(
            response({
              msg: "Something wrong, Try again",
            })
          );
        }
      }
    } catch (error) {
      res.status(400).send(
        response({
          msg: "Something wrong, Try again",
        })
      );
    }
  },

  // Check pin user
  pin: async (req, res) => {
    try {
      const { userId, pin } = req.body;
      const check = await auth.findPin({ userId: userId, pin: pin });
      if (check.length === 0) {
        res.status(400).send(
          response({
            msg: "Invalid Pin",
          })
        );
      } else {
        res.status(200).send(
          response({
            msg: "Pin true",
          })
        );
      }
    } catch (error) {
      res.status(400).send(
        response({
          msg: "Something wrong, Try again",
        })
      );
    }
  },

  // Create Forgot password
  forgot: async (req, res) => {
    try {
      const { email } = req.body;
      const code = Math.floor(1000 + Math.random() * 9000);
      const check = await auth.createForgot({ email: email, code: code });
      if (check.affectedRows < 1) {
        res.status(400).send(
          response({
            msg: "Something wrong, Try again",
          })
        );
      } else {
        await forgotEmail({ email: email, code: code });
        res.status(200).send(
          response({
            status: true,
            msg: "Please check your email",
          })
        );
      }
    } catch (error) {
      res.status(400).send(
        response({
          msg: "Something wrong, Try again",
        })
      );
    }
  },

  // Update pin user
  updatePin: async (req, res) => {
    try {
      const { userId, pin, newPin } = req.body;
      const check = await auth.findPin({ userId: userId, pin: pin });
      if (check.length === 0) {
        res.status(400).send(
          response({
            msg: "Invalid Pin",
          })
        );
      } else {
        const update = await auth.updatePin({ userId: userId, pin: newPin });
        if (update.affectedRows) {
          res.status(400).send(
            response({
              msg: "Update pin success",
              data: req.body,
            })
          );
        } else {
          res.status(400).send(
            response({
              msg: "Something wrong, Try again",
            })
          );
        }
      }
    } catch (error) {
      res.status(400).send(
        response({
          msg: "Something wrong, Try again",
        })
      );
    }
  },
};
