require('dotenv').config()
const { APP_KEY } = process.env
const authModel = require('../model/auth.model')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')
// const { Validator } = require('node-input-validator')
const response = require('../helper/response')

module.exports = {
  loginAuth: async (req, res) => {
    const { email, password, pin } = req.body
    // let v = new Validator(req.body, {
    //   email: "required|email",
    //   password: "required",
    //   pin: "required",
    // });
    // v.check().then((matched) => {
    //   if (!matched) {
    //     res.status(422).send(v.errors);
    //   }
    // });
    const checkLogin = await authModel.findAccount({ email: email })
    console.log(email, password, pin)

    if (!email || !password || !pin) {
      res.status(400).send(
        response({
          msg: 'Please fill all form'
        })
      )
    }

    try {
      if (!checkLogin.status) {
        res
          .status(400)
          .send(response({ msg: 'Please activate your account !' }))
      } else {
        // Check Password
        const checkPassword = bcrypt.compareSync(password, checkLogin.password)

        if (checkPassword) {
          // Create Api Key
          jwt.sign({ checkLogin }, APP_KEY, (err, token) => {
            if (!err) {
              res.status(200).send(
                response({
                  status: true,
                  msg: 'Login succesful',
                  data: {
                    token: token,
                    userId: checkLogin.id,
                    role: checkLogin.role_id
                  }
                })
              )
            } else {
              res.status(400).send(
                response({
                  msg: 'Unable to sign in at this time, try for a few moments'
                })
              )
            }
          })
        } else {
          res.status(400).send(response({ msg: 'Password do not match' }))
        }
      }
    } catch (_) {
      res.status(400).send(
        response({
          msg: 'Email not registered'
        })
      )
    }
  },

  registerAuth: async (req, res) => {
    const { email, password, pin } = req.body
    const checkEmail = await authModel.findEmail({ email: email })

    if (!email || !password || !pin) {
      res.status(400).send(
        response({
          msg: 'Please fill all form'
        })
      )
    }

    // regex
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])(?!.*[!#$%^&*()-+=]).{9,9}$/;

    try {
      console.log('ini checkemail', checkEmail)
      if (checkEmail === 0) {
        const data = {
          email: email,
          password: bcrypt.hashSync(password, salt),
          pin: pin
        }
        console.log('password register: ', password)

        const createUser = await authModel.createUser(data)

        try {
          res.status(200).send(
            response({
              status: true,
              msg: 'Register succesful',
              data: {
                userId: createUser.insertId,
                email: email
              }
            })
          )
        } catch (error) {
          res.status(400).send(
            response({
              msg: 'errooorr'
            })
          )
        }
      } else {
        res.status(400).send(
          response({
            msg: 'Email already registered(dibawah try)'
          })
        )
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(
        response({
          msg: 'Error'
        })
      )
    }
  }
}
