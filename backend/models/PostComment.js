const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostCommentSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' }
})

module.exports = mongoose.model('PostComment', PostCommentSchema)
