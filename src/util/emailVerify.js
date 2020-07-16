require('dotenv').config()
const { APP_EMAIL, APP_EMAIL_PASS, APP_EMAIL_SERVICE } = process.env
const nodemailer = require('nodemailer')
const fs = require('fs')
const mustache = require('mustache')
const auth = require('../model/auth.model')

const emailVerify = async (payload) => {
  try {
    const configMail = {
      service: APP_EMAIL_SERVICE,
      auth: {
        user: APP_EMAIL,
        pass: APP_EMAIL_PASS
      }
    }
    const createKey = await auth.createActivator({
      email: payload.email,
      code: payload.code
    })
    if (createKey.affectedRows) {
      const template = fs.readFileSync('./src/helper/emailVerify.html', { encoding: 'utf-8' })
      const transporter = nodemailer.createTransport(configMail)
      var mailOptions = {
        from: 'discash@gmail.com',
        to: payload.email,
        subject: 'Activate your discash account',
        html: mustache.render(template, { ...payload })
      }
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => err ? reject(Error(err)) : resolve(info))
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = emailVerify
