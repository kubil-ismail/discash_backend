require("dotenv").config();
const { APP_PORT, APP_URL } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./src/util/database");
// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// database.query("SELECT * FROM users", (data, error) => console.log(error));

const auth = require("./src/routes/api/authRoutes");

app.use("/auth", auth);
// Error Route
app.get("*", (req, res) => {
  res.status(404).send(resData(false, "Page not found"));
});

app.listen(APP_PORT || 8000, () => {
  console.log(`Server run on ${APP_PORT}`);
  console.log(`Rest api URL:  ${APP_URL}`);
});
