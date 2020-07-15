require('dotenv').config()
const { APP_PORT, APP_URL } = process.env
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

// Import Routes
const upload = require('./src/route/user/upload.image')
const user = require('./src/route/user/user.detail')

// Allowed All
app.use(cors('*'))

// static link to get image
app.use('/img', express.static('public/assets/image'))

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// App Routes
app.use('/upload', upload)
app.use('/user', user)

// Run Server
app.listen(APP_PORT || 8000, () => {
  console.log(`Server run on port ${APP_PORT}`)
  console.log(`Rest api URL:  ${APP_URL}:${APP_PORT}`)
})
