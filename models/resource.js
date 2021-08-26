const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  name: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  },
  topicId: String,
  description: String
})

const Resource = mongoose.model('Resource',resourceSchema);
module.exports = Resource
