require('dotenv').config()
const { APP_PORT, APP_URL, APP_DEBUG } = process.env
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const response = require('./src/helper/response')

// Import Routes
const home = require('./src/route/index')
const auth = require('./src/route/api/auth.route')
const transactions = require('./src/route/api/transaction/transaction.route')
const topup = require('./src/route/api/transaction/topup.route')
const user = require('./src/route/api/user/user.route')
const transfer = require('./src/route/api/transaction/transfer.route')
const pay = require('./src/route/api/transaction/pay.route')

// DEBUG MODE CHECK
if (APP_DEBUG) {
  // Allowed All
  app.use(cors())
} else {
  // Allowed Url Origins
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5500'
  ]

  // Allowed spesific
  app.use(cors({
    origin: function (origin, callback) {
      // (like mobile apps or curl requests)
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }))
}

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// App Routes
app.use('/', home)
app.use('/auth', auth)
app.use('/transactions', transactions)
app.use('/topup', topup)
app.use('/user', user)
app.use('/transfer', transfer)
app.use('/pay', pay)

// Error Route
app.get('*', (req, res) => {
  res.status(404).send(response({
    msg: 'Page not found'
  }))
})

// Run Server
app.listen(APP_PORT || 8000, () => {
  console.log(`Server run on port ${APP_PORT}`)
  console.log(`Rest api URL:  ${APP_URL}:${APP_PORT}`)
})
