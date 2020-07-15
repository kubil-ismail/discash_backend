const upload = require('../../util/multer')
const multer = require('multer')
const photo = upload.single('image')

module.exports = {
  uploadImage: async (req, res) => {
    photo(req, res, async function (error) {
      if (error instanceof multer.MulterError) {
        const data = {
          success: false,
          msg: 'max 2mb'
        }
        res.status(400).send(data)
      } else if (error) {
        const data = {
          success: false,
          msg: 'only jpeg/jpg/png'
        }
        res.status(400).send(data)
      } else {
        if (!req.file ) {
          const data = {
            success: false,
            msg: 'Please select image'
          }
          res.status(400).send(data)
        } else {
          const data = {
            success: true,
            msg: 'Image added!',
            image: req.file.filename
          }
          res.status(201).send(data)
        }
      }
    })
  },
}
