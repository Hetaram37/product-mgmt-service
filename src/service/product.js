'use strict'

const {
  saveProduct,
  findProduct,
  updateProductDetail,
  removeProduct
} = require('../repository/product')
const {
  config,
  errorGenerator
} = require('../lib/utils')
const SERVICE_CON = 'PMS_P_S_'
const httpStatusCodes = require('http-status-codes')
const Joi = require('@hapi/joi')
const AddProductschema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),
  image: Joi.string().required()
})
const updateProductschema = Joi.object({
  id: Joi.number().strict().required(),
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),
  image: Joi.string().required()
})

const addNewProduct = async (body, files) => {
  console.debug('addNewProduct()')
  await validateProductInput(AddProductschema, body)
  const productDetails = await saveProduct(inputForProduct(body, files[0].filename))
  return productDetails
}

function inputForProduct (body, productImage) {
  const product = {}
  product.name = body.name
  product.image = productImage
  console.debug('Input body for product: %j', product)
  return product
}

async function validateProductInput (schema, body) {
  try {
    const validation = await schema.validateAsync(body)
    return validation
  } catch (error) {
    throw errorGenerator('Partial content', SERVICE_CON + httpStatusCodes.PARTIAL_CONTENT,
      'Partial content', null)
  }
}

const productDetail = async (id) => {
  console.debug('productDetail() id: ', id)
  const details = await findProduct(queryForProductDetails(id),
    productListProjection())
  if (details && Array.isArray(details) && details.length > 0) {
    details[0].image_urls = await getImageFinalPath(details[0].images)
    return details
  }
  throw errorGenerator('No product details found with given id.', SERVICE_CON + httpStatusCodes.NO_CONTENT,
    'No data found', null)
}

async function getImageFinalPath (images) {
  const urls = []
  console.debug('getImageFinalPath() images: %j', images)
  await Promise.all(images.map(img => {
    urls.push(`${config.image.protocol}://${config.image.host}:${config.port}/product/${img}`)
  }))
  console.debug('getImageFinalPath() images with path: %j', urls)
  return urls
}

function queryForProductDetails (id) {
  const query = {}
  query.id = id
  console.debug('queryForProductDetails() query: %j', query)
  return query
}

async function getImageURL (details) {
  console.debug('getImageURL() details: %j', details)
  await Promise.all(details.map(async product => {
    product.image_url = `${config.image.protocol}://${config.image.host}:${config.port}/product/${product.image}`
  }))
  console.debug('getImageURL() details: %j', details)
  return details
}

const updateProduct = async (body, files) => {
  await validateProductInput(updateProductschema, body)
  const updatedData = await updateProductDetail(
    productQuery(body.id),
    updateProductData(body, files[0].filename))
  return updatedData
}

function productQuery (id) {
  const query = {}
  query.id = id
  return query
}

function updateProductData (body, image) {
  const updateSet = {}
  updateSet.name = body.name
  updateSet.image = image
  return updateSet
}

const productList = async () => {
  const details = await findProduct(
    {}, productListProjection())
  console.debug('productList() details: %j', details)
  if (details && Array.isArray(details) && details.length > 0) {
    details.docs = await getImageURL(details)
  }
  console.debug('productList() details: %j', details)
  return details
}

function productListProjection () {
  const projection = {}
  projection.id = true
  projection.name = true
  projection.image = true
  projection._id = false
  return projection
}

const removeProductDetail = async (id) => {
  const response = await removeProduct({ id: id })
  return response
}

module.exports = {
  addNewProduct,
  productList,
  productDetail,
  updateProduct,
  removeProductDetail
}
