const express = require('express')
const router = express.Router()
const Blog = require('../../models/blog.js')
const Topic = require('../../models/topics.js');
const Resource = require('../../models/resource.js');
const topicData = require('../../data/topicData.js');
const resourceData = require('../../data/resourceData.js')
const sessions = express.Router()

const isAuthenticated = (req,res,next)=>{
  // console.log(req.session.currentUser);
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/user')
  }
}


//NEW
router.get('/new', isAuthenticated, (req, res)=> {
  res.render('blog/new.ejs')
})

//INDEX
router.get('/', (req,res) =>{
  Blog.find({}, (err, allBlogs)=> {
    res.render('blog/index.ejs', {blogs: allBlogs})
  })
})


//SHOW
router.get('/:id', (req, res) =>{
const id = req.params.id
  Blog.findById(id, (err, foundBlog)=>{
    if (err) {
      res.send(err);
    } else {
      res.render('blog/show.ejs', {blog:foundBlog, id:id})
    }
  })
})

//POST
router.post('/',(req,res)=>{
  console.log('hitting route')
  Blog.create(req.body,(err,newBlog)=>{
    console.log(req.body)
    if (err) {
      console.log(err);
    } else {
      console.log('checked')
      res.redirect('/blog')
    }
  })
})

//EDIT
router.get('/:id/edit', isAuthenticated, (req, res)=>{
const id = req.params.id
  Blog.findById(id, (err, foundBlog)=>{
    if(err){
      res.send(err)
    } else {
      res.render('blog/edit.ejs', {blog:foundBlog})
    }
  })
})


//DELETE
router.delete('/:id', isAuthenticated, (req,res)=>{
  id = req.params.id
  Blog.findByIdAndRemove(id, (err,removeBlog)=>{
    if (err) {
      res.send(err);
    } else {
      res.redirect('/blog')
    }
  })
})

//UPDATE ROUTE - LIKE
router.put('/:blogId/like',(req,res)=>{
  bId = req.params.blogId
  console.log('like');
  // console.log(req.body);
  req.body.likes++
  console.log(req.body.likes);
  Blog.findByIdAndUpdate(bId,req.body,(err,foundBlog)=>{
    // console.log(foundResource);
    // res.send('testing in progress')
    res.redirect('/blog')
  })
})

//PUT
router.put('/:id', (req, res)=>{
const id = req.params.id
const updatedBlog = req.body
console.log(updatedBlog)
Blog.findByIdAndUpdate(id, updatedBlog, (err, callback) => {
  res.redirect('/blog')
  })
})

module.exports = router
