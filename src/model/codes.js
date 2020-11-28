'use strict'

const mongoose = require('mongoose')
require('mongoose-long')(mongoose)
const Long = mongoose.Schema.Types.Long

const codeSchema = new mongoose.Schema({
  id: Long,
  codes: {
    type: Array,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  created_by: {
    type: String,
    default: 'SYSTEM'
  },
  updated_by: {
    type: String,
    default: 'SYSTEM'
  }
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  },
  collection: 'codes'
})

codeSchema.plugin(global.db.autoIncrement, {
  model: 'code',
  field: 'id',
  startAt: 1
})

module.exports = mongoose.model('code', codeSchema)
