const express = require('express')
const router = express.Router()
const Blog = require('../../models/blog.js')
const Topic = require('../../models/topics.js');
const Resource = require('../../models/resource.js');
const topicData = require('../../data/topicData.js');
const resourceData = require('../../data/resourceData.js')



// user login
router.get('/',(req,res)=>{
  res.render('user/user.ejs')
})



module.exports = router
