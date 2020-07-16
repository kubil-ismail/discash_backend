const profileModel = require('../../model/user/user.detail')
const imageModel = require('../../model/user/upload.image')
const upload = require('../../util/multer')
const multer = require('multer')
const photo = upload.single('picture')

module.exports = {
  uploadImage: async (req, res) => {
    const { id } = req.params
    const checkUser = await profileModel.getProfile({ id: parseInt(id)})

    if (checkUser.length < 1) { //  check is user exsist
      data = {
        success: false,
        msg: 'User not found'
      }
      res.status(400).send(data)
    } else {
      photo(req, res, async function (error) {
        // error handle maximum size
        if (error instanceof multer.MulterError) {
          const data = {
            success: false,
            msg: 'max 2mb'
          }
          res.status(400).send(data)
        } else if (error) { // error handle image type
          const data = {
            success: false,
            msg: 'only jpeg/jpg/png'
          }
          res.status(400).send(data)
        } else {
          if (!req.file ) { //  error handle no file selected
            const data = {
              success: false,
              msg: 'Please select image'
            }
            res.status(400).send(data)
          } else { // if filter image success
            const uploadData = { picture: `picture/profile/${req.file.filename}` , id: parseInt(id) }

            const uploadImage = await imageModel.updateImage(uploadData)
            if (uploadImage) { // upload image success
              data = {
                success: true,
                msg: 'upload success',
                data: uploadData
              }
              res.status(200).send(data)
            } else { // upload image failed
              data = {
                success: false,
                msg: 'upload failed'
              }
              res.status(500).send(data)
            }
          }
        }
      })
    }
  },
}
