const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const bookingSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  recurrence: String
})

module.exports = mongoose.model('Booking', bookingSchema)