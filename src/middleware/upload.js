'use strict'

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../src/ROOT/property_Image/101/')
  },
  filename: (req, file, callback) => {
    const fileName = Date.now() + '_' + file.originalname.toLowerCase().split(' ').join('-')
    console.debug('File name: ', fileName)
    callback(null, fileName)
  }
})

const uploadFiles = multer({
  storage: storage
})

module.exports = {
  uploadFiles
}
