const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  console.log(this.password, 'PASSWORD')
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('User', UserSchema)
