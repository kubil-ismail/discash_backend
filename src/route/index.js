const router = require("express").Router();
const response = require("../helper/response");

// Index Route
router.get("/", (req, res) => {
  res.send(
    response({
      status: true,
      msg: "Welcome to discash backend",
    })
  );
});

module.exports = router;
