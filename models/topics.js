const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  img: String,
})

const Topic = mongoose.model('Topic',resourceSchema)
module.exports = Topic
