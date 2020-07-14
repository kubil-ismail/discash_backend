const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, 'public/assets/image') // uploaded image folder
  },
  filename: function (request, file, cb) {
    cb(null, 'IMG' + new Date().getTime().toString().concat('_').concat(file.originalname))
  }
})

//  check image only png jpg jpeg
const fileFilter = (request, file, cb, error) => {
  const checkImage = file.mimetype.toLowerCase()
  if (checkImage === 'image/jpg' || checkImage === 'image/jpeg' || checkImage === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 //  2mb [maximum image size]
  }
})

module.exports = upload
