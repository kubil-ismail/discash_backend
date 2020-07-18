require('dotenv').config()
const { Validator } = require('node-input-validator')
const response = require('../helper/response')

const updateUserMiddleware = (req, res, next) => {
  // Validator rule
  const valid = new Validator(req.body, {
    fullname: 'required|maxLength:50',
    phone: 'required|phoneNumber',
    birthdate: 'required|date',
    gender: 'required|string'
  })

  // Error message
  let error = ''

  valid.check().then((matched) => {
    for (const prop in valid.errors) {
      error = valid.errors[prop].message
    }
    if (!matched) {
      res.status(422).send(
        response({
          msg: error
        })
      )
    } else {
      next()
    }
  })
}

module.exports = {
  _updateUserMiddleware: updateUserMiddleware
}
