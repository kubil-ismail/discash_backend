require('dotenv').config()
const { APP_PORT, APP_URL } = process.env
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

// Import Routes
const home = require('./src/route/index')
const upload = require('./src/route/user/upload.image')

// Allowed All
app.use(cors('*'))

// static link to get image
app.use('/img', express.static('public/assets/image'))

// Allowed Url Origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5500'
]

// Allowed spesific
// app.use(cors({
//   origin: function (origin, callback) {
//     // (like mobile apps or curl requests)
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }))

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// App Routes
app.use('/', home)
app.use('/upload', upload)

// Run Server
app.listen(APP_PORT || 8000, () => {
  console.log(`Server run on port ${APP_PORT}`)
  console.log(`Rest api URL:  ${APP_URL}:${APP_PORT}`)
})
