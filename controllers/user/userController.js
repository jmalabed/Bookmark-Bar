const express = require('express')
const router = express.Router()
const Blog = require('../../models/blog.js')
const Topic = require('../../models/topics.js');
const Resource = require('../../models/resource.js');
const User = require('../../models/user.js');
const topicData = require('../../data/topicData.js');
const resourceData = require('../../data/resourceData.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync("yourPassword",salt);




// user login
router.get('/',(req,res)=>{
  res.render('user/user.ejs',{user:req.session.currentUser})
})

router.get('/login/create',(req,res)=>{
  res.render('user/newUser.ejs')
})


// create new user post route
router.post('/auth/registration',(req,res)=>{
  const passwordHash = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
  const userDbEntry = {
    username: req.body.username,
    password: passwordHash,
    email: req.body.email
  }
  User.create(userDbEntry,(err,createdUser)=>{
    if (err) {
      console.log(err);
    } else {
      // console.log(createdUser);
      req.session.currentUser = createdUser
      res.redirect('/user')
    }
  })
})


// Login route, compare the entered req.body with the database.
router.post('/auth/login',(req,res)=>{
  User.findOne({username: req.body.username}, (err,foundUser)=>{
    if (err) {
      console.log(err);
    } else {
      // First, check if username matches
      if (!foundUser) {
        res.redirect('/user')
      } else {
        // Now, check if the hashed password matches the req.body.password that was submitted.
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser
          console.log('logged in>>', foundUser._id)
          res.redirect('/topics')
        } else {
          console.log('not matched');
        }
      }
    }
  })
})

// delete route:
router.delete('/logout',(req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/user')
  })
})




module.exports = router
