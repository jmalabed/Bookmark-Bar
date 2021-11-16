const express = require('express')
const router = express.Router()
const Blog = require('../../models/blog.js')
const Topic = require('../../models/topics.js');
const Resource = require('../../models/resource.js');
const topicData = require('../../data/topicData.js');
const resourceData = require('../../data/resourceData.js')


const isAuthenticated = (req,res,next)=>{
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/user')
  }
}


//NEW
router.get('/new', isAuthenticated, (req, res)=> {
  res.render('blog/new.ejs',{user:req.session.currentUser})
})

//INDEX
router.get('/', (req,res) =>{
  Blog.find({}, (err, allBlogs)=> {
    Topic.findById({likes:{$gte:0}}, (err, allTopics=>{
    res.render('blog/index.ejs', {
      blogs: allBlogs,
      topics: allTopics,
      user:req.session.currentUser
      })
    })
  )}
)})


//SHOW
router.get('/:id', (req, res) =>{
const id = req.params.id
  Blog.findById(id, (err, foundBlog)=>{
    if (err) {
      res.send(err);
    } else {
      res.render('blog/show.ejs', {
        blog:foundBlog,
        id:id,
        user:req.session.currentUser
      })
    }
  })
})

//POST
router.post('/',isAuthenticated,(req,res)=>{
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
router.get('/:id/edit',isAuthenticated, (req, res)=>{
const id = req.params.id
  Blog.findById(id, (err, foundBlog)=>{
    if(err){
      res.send(err)
    } else {
      res.render('blog/edit.ejs', {
        blog:foundBlog,
        user:req.session.currentUser
      })
    }
  })
})


//DELETE
router.delete('/:id',isAuthenticated,(req,res)=>{
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
router.put('/:blogId/like',isAuthenticated,(req,res)=>{
  bId = req.params.blogId
  req.body.likes++
  Blog.findByIdAndUpdate(bId,req.body,(err,foundBlog)=>{
    res.redirect('/blog')
  })
})

//UPDATE ROUTE - COMMENTS
router.put('/:blogId/comment',(req,res)=>{
  bId = req.params.blogId;
  newComment = req.body.comments
  // req.body.comments.push(req.body)
  Blog.findByIdAndUpdate(bId,{$push: {comments:req.body.comments}},(err,foundBlog)=>{
    if (err) {
      console.log(err);
    } else {
      res.redirect('/blog/'+req.params.blogId)
    }
  })
})

//PUT
router.put('/:id',isAuthenticated,(req, res)=>{
const id = req.params.id
const updatedBlog = req.body

Blog.findByIdAndUpdate(id, updatedBlog, (err, callback) => {
  res.redirect('/blog')
  })
})

module.exports = router
