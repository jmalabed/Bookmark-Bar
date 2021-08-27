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
  description: String
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
