'use strict'

const {
  config
} = require('../lib/utils')
require('../model/product')
const database = config.get('database')

const saveProduct = async (data) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const ProductDetails = db.model('product')
    const product = new ProductDetails(data)
    return product.save()
  } catch (error) {
    console.error('Error while adding product details: %s %j', error, error)
    throw error
  }
}

const updateProductDetail = async (query, data, projection) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const ProductDetails = db.model('product')
    const response = await ProductDetails.update(query, data, projection)
    return response
  } catch (error) {
    console.error('Error while updating product details: %s %j', error, error)
    throw error
  }
}

const findProduct = async (query, projection) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const productDetails = db.model('product')
    const product = await productDetails.find(query, projection).lean()
    return product
  } catch (error) {
    console.error('Error while getting product details: %s %j', error, error)
    throw error
  }
}

const removeProduct = async (query) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const productDetails = db.model('product')
    const product = await productDetails.remove(query).lean()
    return product
  } catch (error) {
    console.error('Error while getting product details: %s %j', error, error)
    throw error
  }
}

const findProductWithPagination = async (query, properties) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const ProductDetails = db.model('Product')
    const product = await ProductDetails.paginate(query, properties)
    return product
  } catch (error) {
    console.error('Error while getting product details: %s %j', error, error)
    throw error
  }
}

module.exports = {
  saveProduct,
  updateProductDetail,
  findProduct,
  removeProduct,
  findProductWithPagination
}
