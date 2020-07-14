const upload = require('../../util/multer')
const photo = upload.single('image')

module.exports = {
  uploadImage: async (request, response) => {
    photo(request, response, async function (error) {
      if (upload.MulterError || error) {
        return response
          .status(400)
          .json({ success: false, msg: 'only jpeg/jpg/png file, max 2mb' })
      } else {
        const data = {
          success: true,
          msg: 'Image added!',
          image: request.file.filename
        }
        response.status(201).send(data)
      }
    })
  }
}
