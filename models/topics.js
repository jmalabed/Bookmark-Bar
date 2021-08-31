const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: String,
  likes: {
    type: Number,
    default: 0
  },
  resources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  }]
})

const Topic = mongoose.model('Topic',topicSchema)
module.exports = Topic
