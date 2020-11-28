'use strict'

const router = require('express').Router()
const {
  addProduct,
  productDetails,
  productListDetails,
  removeProduct,
  updateProductDetail
} = require('../controller/product')

router.post('/v1/add', addProduct)
router.get('/v1/:id/detail', productDetails)
router.get('/v1/list', productListDetails)
router.delete('/v1/delete', removeProduct)
router.put('/v1/update', updateProductDetail)

module.exports = router
