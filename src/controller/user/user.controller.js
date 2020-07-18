const userModel = require("../../model/user/user.model");
const response = require("../../helper/response");
const upload = require("../../util/multer");

module.exports = {
  // Get user profile from db
  getProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await userModel.getProfile({ id: parseInt(id) || null });
      if (result.length !== 0) {
        res.status(200).send(
          response({
            status: true,
            msg: "Success get profile",
            data: result,
          })
        );
      } else {
        res.status(400).send(
          response({
            msg: "User not found",
          })
        );
      }
    } catch (error) {
      res.status(400).send(
        response({
          msg: "Something wrong, Try again",
        })
      );
    }
  },

  // Update user profile by id
  editProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const check = await userModel.findProfile({ id: parseInt(id) });
      if (check.length === 1) {
        const data = [updateData, { id: parseInt(id) }];
        const update = await userModel.updateProfile(data);
        if (update.affectedRows) {
          res.status(200).send(
            response({
              status: true,
              msg: "Update success",
              data: updateData,
            })
          );
        } else {
          res.status(400).send(
            response({
              msg: "Update failed",
            })
          );
        }
      } else {
        res.status(400).send(
          response({
            msg: "User not found",
          })
        );
      }
    } catch (error) {
      console.log("editProfile", error);

      res.status(400).send(
        response({
          msg: "Something wrong, Try again",
        })
      );
    }
  },

  editAvatar: (req, res) => {
    upload(req, res, async () => {
      console.log(req.file);
      console.log(req.body);
      if (req.fileValidationError) {
        return res.status(400).send(
          response({
            msg: req.fileValidationError,
          })
        );
      } else if (!req.file) {
        return res.status(400).send(
          response({
            msg: "Please select an image to upload",
          })
        );
      }

      try {
        const { id } = req.params;
        const check = await userModel.findProfile({ id: parseInt(id) });
        if (check.length === 1) {
          const updateData = { picture: `profile/${req.file.filename}` };
          const data = [updateData, { id: parseInt(id) }];
          const update = await userModel.updateProfile(data);
          if (update.affectedRows) {
            res.status(200).send(
              response({
                msg: "Update success",
                data: updateData,
              })
            );
          } else {
            res.status(400).send(
              response({
                msg: "Update failed",
              })
            );
          }
        } else {
          res.status(400).send(
            response({
              msg: "User not found",
            })
          );
        }
      } catch (error) {
        res.status(400).send(
          response({
            msg: "Something wrong, Try again",
          })
        );
      }
    });
  },

  // Delete user from db
  deleteProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const check = await userModel.findProfile({ id: parseInt(id) });
      if (check.length === 1) {
        const deleted = await userModel.deleteProfile({ id: parseInt(id) });
        if (deleted.affectedRows) {
          res.status(200).send(
            response({
              status: true,
              msg: "Delete user success",
              data: req.params,
            })
          );
        } else {
          res.status(400).send(
            response({
              msg: "Delete failed",
            })
          );
        }
      } else {
        res.status(400).send(
          response({
            msg: "User not found",
          })
        );
      }
    } catch (error) {
      res.status(400).send(
        response({
          msg: "Something wrong, Try again",
        })
      );
    }
  },
};
