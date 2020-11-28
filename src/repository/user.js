'use strict'

const {
  config
} = require('../lib/utils')
require('../model/user')
const database = config.get('database')

const findUser = async (query, projection) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const userDetails = db.model('user')
    const user = await userDetails.find(query, projection).lean()
    return user
  } catch (error) {
    console.error('Error while getting user details: %s %j', error, error)
    throw error
  }
}

module.exports = {
  findUser
}
