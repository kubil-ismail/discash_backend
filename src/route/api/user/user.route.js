const router = require("express").Router();
const {
  getProfile,
  editProfile,
  editAvatar,
  deleteProfile,
} = require("../../../controller/user/user.controller");
//const { _updateAvatar } = require("../../../middleware/user.middleware");
const {
  _updateUserMiddleware,
} = require("../../../middleware/user.middleware");

const { _authApi } = require("../../../middleware/auth.middleware");

router
  .get("/:id?", getProfile)
  .patch("/:id", _authApi, _updateUserMiddleware, editProfile)
  .patch("/avatar/:id", _authApi, editAvatar)
  .delete("/:id", _authApi, deleteProfile);

module.exports = router;
