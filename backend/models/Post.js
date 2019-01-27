const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  likes: {
    type: Number,
    default: 0
  },
  username: {
    type: String
  },
  imageUrl: {
    type: String
  }
})

module.exports = mongoose.model('Recipe', PostSchema)
