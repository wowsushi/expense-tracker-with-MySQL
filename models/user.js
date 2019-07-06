const mongoose = require('mongoose')
const Schema = mongoose.Schema

UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  password: {
    type: String,
    required: false
  },
  monthlyBudget: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('User', UserSchema)