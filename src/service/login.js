'use strict'

const {
  errorGenerator
} = require('../lib/utils')
const {
  findUser
} = require('../repository/user')
const httpStatusCodes = require('http-status-codes')
const SERVICE_CON = 'PMS_L_S_'
const { generateToken } = require('./token')
const Joi = require('@hapi/joi')

const userLogin = async (body) => {
  console.debug('userLogin() body: %j', body)
  await validateInput(body)
  const userData = await findUser(queryUser(body.userName, body.password), projectionUser())
  console.debug('User details: %j', userData)
  isValidUser(userData)
  const tokenDetails = await generateToken(userData[0]._id, userData.role)
  const response = finalResponse(userData, body, tokenDetails)
  return response
}

function finalResponse (userData, body, tokenDetails) {
  const response = {}
  response.userName = body.userName
  response.token = tokenDetails.data.token
  response.expire_on = tokenDetails.data.expire_on
  response.user_id = userData[0].id
  return response
}

function isValidUser (userData) {
  if (!(userData && Array.isArray(userData) && userData.length !== 0)) {
    throw errorGenerator('Invalid login credentials', SERVICE_CON + httpStatusCodes.UNAUTHORIZED,
      'Invalid login credentials', null)
  }
}

function queryUser (userName, password) {
  const query = {}
  query.user_name = userName
  query.password = password
  return query
}

function projectionUser () {
  const projection = {}
  projection.user_name = true
  projection._id = false
  projection.id = true
  projection.role = true
  return projection
}

async function validateInput (body) {
  const schema = Joi.object({
    userName: Joi.string()
      .min(2)
      .max(25)
      .required(),
    password: Joi.string().required()
  })

  try {
    const validation = await schema.validateAsync(body)
    return validation
  } catch (error) {
    throw errorGenerator('Partial content', SERVICE_CON + httpStatusCodes.PARTIAL_CONTENT,
      'Partial content', null)
  }
}

module.exports = {
  userLogin
}
