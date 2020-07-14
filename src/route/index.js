const router = require('express').Router()
const response = require('../helper/response')

// Index Route
router.get('/', (req, res) => {
  res.send(response({
    status: true,
    msg: 'Welcome to discash backend'
  }))
})

// Error Route
router.get('*', (req, res) => {
  res.status(404).send(response({
    msg: 'Page not found'
  }))
})

module.exports = router
