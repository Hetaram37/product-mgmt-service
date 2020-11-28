'use strict'

const Joi = require('@hapi/joi')
const {
  errorGenerator
} = require('../lib/utils')
const SERVICE_CON = 'PMS_P_S_'
const httpStatusCodes = require('http-status-codes')
const { updateProductDetail } = require('../repository/product')
const { saveCodes } = require('../repository/codes')

const codeSchema = Joi.object({
  product_id: Joi.number().strict().required(),
  batch_number: Joi.number().strict().required(),
  mfg_date: Joi.date().required(),
  exp_date: Joi.date().required(),
  number_of_codes: Joi.number().strict().required()
})

const generateCode = async (body) => {
  console.debug('generateCode() body: %j', body)
  await validateProductInput(codeSchema, body)
  const codes = getCode(body.number_of_codes, body.product_id)
  await Promise.all([
    updateProduct(body),
    saveCodeDetails(codes, body.product_id)
  ])
  return codes
}

async function saveCodeDetails (codes, id) {
  const savedData = await saveCodes(bodyForCodes(codes, id))
  return savedData
}

function bodyForCodes (codes, id) {
  const body = {}
  body.codes = codes
  body.product_id = id
  return body
}

async function updateProduct (productDetail) {
  const updatedData = await updateProductDetail(
    queryProduct(productDetail.id),
    updateProductData(productDetail)
  )
  return updatedData
}

function queryProduct (id) {
  const query = {}
  query.id = id
  return query
}

function updateProductData (body) {
  const updateSet = {}
  updateSet.batch_no = body.batch_number
  updateSet.mfg_date = body.mfg_date
  updateSet.expire_date = body.exp_date
  return updateSet
}

async function getCode (codeLength, productId) {
  const codes = []
  Array.from(Array(codeLength)).forEach((e) => {
    codes.push(Number(productId + Date.now() + e * 2))
  })
  return codes
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

module.exports = {
  generateCode
}
