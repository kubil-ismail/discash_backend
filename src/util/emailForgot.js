require("dotenv").config();
const { APP_EMAIL, APP_EMAIL_PASS, APP_EMAIL_SERVICE } = process.env;
const nodemailer = require("nodemailer");
const fs = require("fs");
const mustache = require("mustache");

const emailVerify = async (payload) => {
  const configMail = {
    service: APP_EMAIL_SERVICE,
    auth: {
      user: APP_EMAIL,
      pass: APP_EMAIL_PASS,
    },
  };

  const template = fs.readFileSync("./src/helper/emailForgot.html", {
    encoding: "utf-8",
  });
  const transporter = nodemailer.createTransport(configMail);
  var mailOptions = {
    from: "discash@gmail.com",
    to: payload.email,
    subject: "Reset password discash account",
    html: mustache.render(template, { ...payload }),
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) =>
      err ? reject(Error(err)) : resolve(info)
    );
  });
};

module.exports = emailVerify;
