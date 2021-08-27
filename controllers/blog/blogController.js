const express = require('express')
const router = express.Router()
const Blog = require('../../models/blog.js')
//NEW
router.get('/new', (req, res)=> {
  res.render('blog/new.ejs')
})

//INDEX
router.get('/', (req,res) =>{
  Blog.find({}, (err, allBlogs)=> {
    res.render('blog/index.ejs', {blogs: allBlogs})
  })
})

//POST
router.post('/',(req,res)=>{
  Blog.create(req.body,(err,newBlog)=>{
    if (err) {
      console.log(err);
    } else {
      res.redirect('/blog')
    }
  })
})
module.exports = router
