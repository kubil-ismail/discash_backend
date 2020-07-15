require("dotenv").config();
const { APP_KEY, APP_PIN } = process.env;
const authModel = require("../model/auth.model");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const response = require("../helper/response");

module.exports = {
  loginAuth: async (req, res) => {
    const { email, password, pin_id } = req.body;
    const checkLogin = await authModel.findAccount({ email: email });
    console.log(email, password, pin_id);

    if (!email || !password || !pin_id) {
      res.status(400).send(
        response({
          msg: "Please fill all form",
        })
      );
    }

    try {
      if (!checkLogin.status) {
        res
          .status(400)
          .send(response({ msg: "Please activate your account !" }));
      } else {
        // Check Password
        const checkPassword = bcrypt.compareSync(password, checkLogin.password);

        if (checkPassword) {
          // Create Api Key
          jwt.sign({ checkLogin }, APP_KEY, (err, token) => {
            if (!err) {
              res.status(200).send(
                response({
                  status: true,
                  msg: "Login succesful",
                  data: {
                    apiKey: token,
                    userId: checkLogin.id,
                    rolle: checkLogin.rolle_id,
                  },
                })
              );
            } else {
              res.status(400).send(
                response({
                  msg: "Unable to sign in at this time, try for a few moments",
                })
              );
            }
          });
        } else {
          res.status(400).send(response({ msg: "Password do not match" }));
        }
      }
    } catch (_) {
      res.status(400).send(
        response({
          msg: "Email not registered",
        })
      );
    }
  },

  registerAuth: async (req, res) => {
    const { email, password, pin_id } = req.body;
    const checkEmail = await authModel.findEmail({ email: email });
    try {
      console.log("ini checkemail", checkEmail);

      if (checkEmail === 0) {
        const data = {
          email: email,
          password: bcrypt.hashSync(password, salt),
          pin_id: pin_id,
        };
        console.log("password register: ", password);

        const createUser = await authModel.createUser(data);
        // console.log(createUser);
        // createUser.then((_result) => console.log("_result", _result));
        try {
          res.status(200).send(
            response({
              status: true,
              msg: "Register succesful",
              data: {
                userId: createUser.insertId,
                email: email,
              },
            })
          );
        } catch (error) {
          res.status();
        }
        // .then((checkEmail) => {
        //   res.status(200).send(
        //     response({
        //       status: true,
        //       msg: "Registration successful",
        //       data: {
        //         userId: checkEmail.insertId,
        //         email: email,
        //       },
        //     })
        //   );
        // })
        // .catch((_) => {
        //   res.status(200).send(
        //     response({
        //       msg: "Registration succesfull",
        //     })
        //   );
        // })

        // .catch((_) => {
        //   res.status(400).send(
        //     response({
        //       msg: "Email failed to send",
        //     })
        //   );
        // });
      } else {
        res.status(400).send(
          response({
            msg: "Email already registered(dibawah try)",
          })
        );
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(
        response({
          msg: "Email already registered",
        })
      );
      // res.status(400).send(
      //   response({
      //     msg: "Email already registered",
      //   })
      // );
    }

    // checkEmail.then((_result) => {
    //   if (!_result) {
    //     const data = {
    //       email: email,
    //       password: bcrypt.hashSync(password, salt),
    //       pin_id: pin_id,
    //     };
    //     console.log("password register: ", password);

    //     const createUser = authModel.createUser(data);
    //     createUser
    //       .then((_result) => {
    //         res.status(200).send(
    //           response({
    //             status: true,
    //             msg: "Registration successful",
    //             data: {
    //               userId: _result.insertId,
    //               email: email,
    //             },
    //           })
    //         );
    //       })
    //       .catch((_) => {
    //         res.status(200).send(
    //           response({
    //             msg: "Registration succesfull",
    //           })
    //         );
    //       })

    //       .catch((_) => {
    //         res.status(400).send(
    //           response({
    //             msg: "Email failed to send",
    //           })
    //         );
    //       });
    // } else {
    //   res.status(400).send(
    //     response({
    //       msg: "Email already registered",
    //     })
    //   );
    // }
  },
};
