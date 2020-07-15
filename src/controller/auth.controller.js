require('dotenv').config()
const auth = require('../model/auth.model')
const response = require('../helper/response')

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
  }
}