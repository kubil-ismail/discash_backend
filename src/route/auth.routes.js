const router = require("express").Router();
const {
  loginAuth,
  registerAuth,
} = require("../../src/controller/auth.controller");

router.post("/login", loginAuth).post("/register", registerAuth);
// .post("/activate", activateAuth);

module.exports = router;
