const router = require("express").Router();
const { loginAuth } = require("../../controllers/authController");

router
  .post("/login", loginAuth)
  .post("/signin", registerAuth)
  .post("/activate", activateAuth);

module.exports = router;
