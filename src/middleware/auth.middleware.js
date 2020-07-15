const { Validator } = require('node-input-validator')
const response = require('../helper/response')

const activateMid = (req, res, next) => {
  // Validator rule
  const valid = new Validator(req.body, {
    email: 'required|email',
    pin: 'required|numeric|minLength:6|maxLength:6'
  })

  // Error message
  let error = ''

  valid.check().then((matched) => {
    for (const prop in valid.errors) {
      error = valid.errors[prop].message
    }
    if (!matched) {
      res.status(422).send(response({
        msg: error
      }))
    } else {
      next()
    }
  })
}

module.exports = {
  _activate: activateMid
}
