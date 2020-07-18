require('dotenv').config()
const { Validator } = require('node-input-validator')
const response = require('../helper/response')

const payMiddleware = (req, res, next) => {
  // Validator rule
  const valid = new Validator(req.body, {
    payment: 'required|numeric',
    userid: 'required|numeric',
    name: 'required|string',
    price: 'required|integer',
    date: 'required|date'
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
  _payMiddleware: payMiddleware
}
