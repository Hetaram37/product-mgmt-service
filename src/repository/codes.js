'use strict'

const {
  config
} = require('../lib/utils')
require('../model/codes')
const database = config.get('database')

const saveCodes = async (data) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const CodesDetails = db.model('codes')
    const codes = new CodesDetails(data)
    return codes.save()
  } catch (error) {
    console.error('Error while adding codes details: %s %j', error, error)
    throw error
  }
}

module.exports = {
  saveCodes
}
