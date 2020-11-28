'use strict'

const mongoose = require('mongoose')
require('mongoose-long')(mongoose)
const Long = mongoose.Schema.Types.Long

const userSchema = new mongoose.Schema({
  id: Long,
  user_name: {
    type: String,
    required: [true, 'User Name is required']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
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
  collection: 'user'
})

userSchema.plugin(global.db.autoIncrement, {
  model: 'user',
  field: 'id',
  startAt: 1
})

module.exports = mongoose.model('user', userSchema)
