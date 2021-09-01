const express = require('express')
const router = express.Router()
const Blog = require('../../models/blog.js')
const Topic = require('../../models/topics.js');
const Resource = require('../../models/resource.js');
const User = require('../../models/user.js');
const topicData = require('../../data/topicData.js');
const resourceData = require('../../data/resourceData.js');
const bcrypt = require('bcrypt');
const sessions = express.Router()
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync("yourPassword",salt);


const isAuthenticated = (req,res,next)=>{
  // console.log(req.session.currentUser);
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/user')
  }
}


// user login
router.get('/',(req,res)=>{
  res.render('user/user.ejs',{currentUser:req.session.currentUser})
})

router.get('/login/create',(req,res)=>{
  res.render('user/newUser.ejs')
})


// create new user post route
router.post('/auth/registration',(req,res)=>{
  // console.log(req.body);
  const passwordHash = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
  // console.log(passwordHash);
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
      console.log(req.session.currentUser);
      res.redirect('/user')
    }
  })
})


// Login route, compare the entered req.body with the database.
router.post('/auth/login',(req,res)=>{
  // console.log("testing");
  User.findOne({ username: req.body.username}, (err,foundUser)=>{
    console.log(foundUser);
    if (err) {
      console.log(err);
    } else {
      // First, check if username matches
      // console.log('testing1');
      if (!foundUser) {
        alert('user not found')
        // console.log('not found');
        res.redirect('/user')
      } else {
        // console.log('peering in');
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
