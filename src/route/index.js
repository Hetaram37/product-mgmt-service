'use strict'

const loginRoute = require('./login')
const productRoute = require('./product')
const uniqueCodeRoute = require('./generateUniqueCode')
const cors = require('cors')
const { verifyToken } = require('../middleware/token')

module.exports = (app) => {
  app.use('/api/auth', cors(), loginRoute)
  app.use('/api/product', [cors(), verifyToken], productRoute)
  app.use('/api/product', [cors(), verifyToken], uniqueCodeRoute)
}
