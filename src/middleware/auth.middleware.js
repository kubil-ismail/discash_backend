require("dotenv").config();
const { APP_KEY } = process.env;
const jwt = require("jsonwebtoken");
const { Validator } = require("node-input-validator");
const response = require("../helper/response");

const activateMiddleware = (req, res, next) => {
  // Validator rule
  const valid = new Validator(req.body, {
    email: "required|email",
    pin: "required|numeric|minLength:4|maxLength:4",
  });

  // Error message
  let error = "";

  valid.check().then((matched) => {
    for (const prop in valid.errors) {
      error = valid.errors[prop].message;
    }
    if (!matched) {
      res.status(422).send(
        response({
          msg: error,
        })
      );
    } else {
      next();
    }
  });
};

const pinMiddleware = (req, res, next) => {
  // Validator rule
  const valid = new Validator(req.body, {
    pin: "required|numeric|minLength:4|maxLength:4",
    userId: "required|numeric",
  });

  // Error message
  let error = "";

  valid.check().then((matched) => {
    for (const prop in valid.errors) {
      error = valid.errors[prop].message;
    }
    if (!matched) {
      res.status(422).send(
        response({
          msg: error,
        })
      );
    } else {
      next();
    }
  });
};

const forgotMiddleware = (req, res, next) => {
  // Validator rule
  const valid = new Validator(req.body, {
    email: "required|email",
  });

  // Error message
  let error = "";

  valid.check().then((matched) => {
    for (const prop in valid.errors) {
      error = valid.errors[prop].message;
    }
    if (!matched) {
      res.status(422).send(
        response({
          msg: error,
        })
      );
    } else {
      next();
    }
  });
};

const loginMiddleware = (req, res, next) => {
  // Validator rule
  const valid = new Validator(req.body, {
    email: "required|email",
    password: "required",
  });

  // Error message
  let error = "";

  valid.check().then((matched) => {
    for (const prop in valid.errors) {
      error = valid.errors[prop].message;
    }
    if (!matched) {
      res.status(422).send(
        response({
          msg: error,
        })
      );
    } else {
      next();
    }
  });
};

const registerMiddleware = (req, res, next) => {
  // Validator rule
  const valid = new Validator(req.body, {
    email: "required|email",
    password: "required|minLength:8",
    pin: "required|numeric|minLength:4|maxLength:4",
    role_id: "numeric",
  });

  // Error message
  let error = "";

  valid.check().then((matched) => {
    for (const prop in valid.errors) {
      error = valid.errors[prop].message;
    }
    if (!matched) {
      res.status(422).send(
        response({
          msg: error,
        })
      );
    } else {
      next();
    }
  });
};

const updatePinMiddleware = (req, res, next) => {
  // Validator rule
  const valid = new Validator(req.body, {
    pin: "required|numeric|minLength:4|maxLength:4",
    newPin: "required|numeric|minLength:4|maxLength:4",
    userId: "required|numeric",
  });

  // Error message
  let error = "";

  valid.check().then((matched) => {
    for (const prop in valid.errors) {
      error = valid.errors[prop].message;
    }
    if (!matched) {
      res.status(422).send(
        response({
          msg: error,
        })
      );
    } else {
      next();
    }
  });
};

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (typeof header !== "undefined") {
    jwt.verify(header, APP_KEY, function (err) {
      if (err) {
        res.status(401).send(
          response({
            msg: "Api Key not registered",
          })
        );
      } else {
        next();
      }
    });
  } else {
    res.status(401).send(
      response({
        msg: "Api key cannot be empty",
      })
    );
  }
};

module.exports = {
  _activate: activateMiddleware,
  _pin: pinMiddleware,
  _forgot: forgotMiddleware,
  _login: loginMiddleware,
  _register: registerMiddleware,
  _updatePin: updatePinMiddleware,
  _authApi: auth,
};
