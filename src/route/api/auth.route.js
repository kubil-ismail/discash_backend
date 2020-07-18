const router = require("express").Router();
const {
  activate,
  pin,
  forgot,
  login,
  register,
  updatePin,
} = require("../../controller/auth.controller");
const {
  _activate,
  _pin,
  _forgot,
  _login,
  _register,
  _updatePin,
  _authApi,
} = require("../../middleware/auth.middleware");

// routes
router
  .post("/pin", _pin, pin)
  .post("/login", _login, login)
  .post("/register", _register, register)
  .post("/activate", _activate, activate)
  .post("/forgot", _forgot, forgot)
  .patch("/pin", _authApi, _updatePin, updatePin);

module.exports = router;
