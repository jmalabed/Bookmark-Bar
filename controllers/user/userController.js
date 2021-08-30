const express = require('express')
const router = express.Router()
const Blog = require('../../models/blog.js')
const Topic = require('../../models/topics.js');
const Resource = require('../../models/resource.js');
const User = require('../../models/user.js');
const topicData = require('../../data/topicData.js');
const resourceData = require('../../data/resourceData.js')



// user login
router.get('/',(req,res)=>{
  res.render('user/user.ejs')
})

router.get('/login/create',(req,res)=>{
  res.render('user/newUser.ejs')
})
// create new user post route
router.post('/create',(req,res)=>{
  console.log(req.body);
  User.create([req.body],(err,createdUser)=>{
    if (err) {
      console.log(err);
    } else {
      res.send('user created')
    }
  })

  // res.redirect('/user')
})

module.exports = router
