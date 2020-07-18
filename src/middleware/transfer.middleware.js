require('dotenv').config()
const { Validator } = require('node-input-validator')
const response = require('../helper/response')

const transferMiddleware = (req, res, next) => {
  // Validator rule
  const valid = new Validator(req.body, {
    payment: 'required|numeric',
    account_number: 'required|integer',
    name: 'required|string',
    price: 'required|integer'
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
  _transferMiddleware: transferMiddleware
}
