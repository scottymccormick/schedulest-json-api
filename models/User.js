const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  phone: String,
  googleId: {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model('User', userSchema)