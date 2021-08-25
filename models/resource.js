const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  name: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  topicId: String,
  description: String
})

const Resource = mongoose.model('Resource',resourceSchema)
module.exports = Resource
