require('dotenv').config()
const auth = require('../model/auth.model')
const response = require('../helper/response')
const forgotEmail = require('../util/emailForgot')

module.exports = {
  // Activate account
  activate: async (req, res) => {
    try {
      const { email, pin } = req.body
      const check = await auth.findCode({ email: email, pin: pin })
      if (check.affectedRows < 1) {
        res.status(400).send(response({
          msg: 'Invalid Pin'
        }))
      } else {
        const activate = await auth.activate({ email: email })
        if (activate) {
          res.status(200).send(response({
            status: true,
            msg: 'Activation successful'
          }))
        } else {
          res.status(400).send(response({
            msg: 'Something wrong, Try again'
          }))
        }
      }
    } catch (error) {
      res.status(400).send(response({
        msg: 'Something wrong, Try again'
      }))
    }
  },

  // Check pin user
  pin: async (req, res) => {
    try {
      const { userId, pin } = req.body
      const check = await auth.findPin({ userId: userId, pin: pin })
      if (check.length === 0) {
        res.status(400).send(response({
          msg: 'Invalid Pin'
        }))
      } else {
        res.status(200).send(response({
          msg: 'Pin true'
        }))
      }
    } catch (error) {
      res.status(400).send(response({
        msg: 'Something wrong, Try again'
      }))
    }
  },

  // Create Forgot password
  forgot: async (req, res) => {
    try {
      const { email } = req.body
      const code = Math.floor(1000 + Math.random() * 9000)
      const check = await auth.createForgot({ email: email, code: code })
      if (check.affectedRows < 1) {
        res.status(400).send(response({
          msg: 'Something wrong, Try again'
        }))
      } else {
        await forgotEmail({ email: email, code: code })
        res.status(200).send(response({
          status: true,
          msg: 'Please check your email'
        }))
      }
    } catch (error) {
      res.status(400).send(response({
        msg: 'Something wrong, Try again'
      }))
    }
  }
}
