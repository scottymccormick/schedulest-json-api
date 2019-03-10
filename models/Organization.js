const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orgSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  dayRate: Number,
  cancelTime: Number,
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = mongoose.model('Organization', orgSchema)