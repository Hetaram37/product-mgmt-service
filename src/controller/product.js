'use strict'

const {
  responseGenerators,
  getStatusCode,
  errorGenerator
} = require('../lib/utils')
const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST
} = require('http-status-codes')
const {
  addNewProduct,
  productDetail,
  productList,
  updateProduct,
  removeProductDetail
} = require('../service/product')
const CONTROLLER_CONS = 'PMS_P_C_'

const addProduct = async (req, res, next) => {
  try {
    console.debug('addProduct()')
    const response = await addNewProduct(req.body, req.files)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while adding new product: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const productDetails = async (req, res, next) => {
  try {
    console.debug('productDetails()')
    const id = req.params.id
    const response = await productDetail(id)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while getting product details: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const productListDetails = async (req, res, next) => {
  try {
    console.debug('productDetails()')
    const response = await productList()
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while getting product list: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const updateProductDetail = async (req, res, next) => {
  try {
    console.debug('UpdateProductDetail()')
    const response = await updateProduct(req.body, req.files)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while updating product detail: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const removeProduct = async (req, res, next) => {
  try {
    console.debug('removeProduct()')
    const id = req.params.id
    const response = await removeProductDetail(id)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while deleting product detail: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

module.exports = {
  addProduct,
  productDetails,
  productListDetails,
  updateProductDetail,
  removeProduct
}
