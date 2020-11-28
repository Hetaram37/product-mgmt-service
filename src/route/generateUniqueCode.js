'use strict'

const router = require('express').Router()
const {
  generateUniqueCode
} = require('../controller/generateUniqueCode')

router.post('/v1/generate/code', generateUniqueCode)

module.exports = router
