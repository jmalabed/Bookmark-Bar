const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  topicTest: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Topic'
  },
  header: {
    type: String,
    required: true
  },
  description: String,
  comments: String,
}, {timestamps:true})


const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
