'use strict'

const router = require('express').Router()
const {
  userAuthentication
} = require('../controller/login')

router.get('/v1/login', userAuthentication)

module.exports = router
