const modalUser = require('../../model/user/upload.image')
const upload = require('../../util/multer')
const multer = require('multer')
const photo = upload.single('image')

module.exports = {
  uploadImage: async (request, response) => {
    photo(request, response, async function (error) {
      if (error instanceof multer.MulterError) {
        const data = {
          success: false,
          msg: 'max 2mb'
        }
        return response.status(400).send(data)
      } else if (error) {
        const data = {
          success: false,
          msg: 'only jpeg/jpg/png'
        }
        return response.status(400).send(data)
      } else {
        const data = {
          success: true,
          msg: 'Image added!',
          image: request.file.filename
        }
        response.status(201).send(data)
      }
    })
  },
  getUserDetail: async (request, response) => {
    const users = await modalUser.getAllUser()
    const data = {
      msg: 'List user detail',
      data: users || []
    }
  }
}
