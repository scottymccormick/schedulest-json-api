const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const locationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  calendar: String
})

module.exports = mongoose.model('Location', locationSchema)