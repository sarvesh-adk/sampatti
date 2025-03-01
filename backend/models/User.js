const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: false
  }
})

const User = mongoose.model('user', UserSchema)
User.createIndexes()

module.exports = User
