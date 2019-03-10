const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  googleId: String,
  organizations: [{
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  }]
})

module.exports = mongoose.model('User', userSchema)