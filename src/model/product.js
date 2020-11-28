'use strict'

const mongoose = require('mongoose')
require('mongoose-long')(mongoose)
const Long = mongoose.Schema.Types.Long

const productSchema = new mongoose.Schema({
  id: Long,
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  image: {
    type: Array,
    required: [true, 'Image is required']
  },
  batch_no: {
    type: Number
  },
  mfg_date: {
    type: Date
  },
  expire_date: {
    type: Date
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
  collection: 'product'
})

productSchema.plugin(global.db.autoIncrement, {
  model: 'product',
  field: 'id',
  startAt: 1
})

module.exports = mongoose.model('product', productSchema)
