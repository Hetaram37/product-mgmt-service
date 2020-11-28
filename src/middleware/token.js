const {
  config,
  errorGenerator
} = require('../lib/utils')
const jwt = require('jsonwebtoken')
const httpStatusCodes = require('http-status-codes')
const SERVICE_CON = 'PMS_T_S_'

const verifyToken = (req, res) => {
  const token = req.header('Authorization')
  console.debug('verifyToken() token: %s', token)
  if (token) {
    const tokenArray = token.split(' ')
    const mainToken = tokenArray[1]
    const tokenData = jwt.verify(mainToken, config.get('JWT_key'))
    console.debug('Data from JWT verify: %s %j', tokenData, tokenData)
    return tokenData
  }
  throw errorGenerator('Not authorized', SERVICE_CON + httpStatusCodes.UNAUTHORIZED,
    'Not authorized', null)
}

module.exports = {
  verifyToken
}
