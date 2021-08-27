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

//EDIT
router.get('/:id/edit', (req, res)=>{
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
router.delete('/:id',(req,res)=>{
  id = req.params.id
  Blog.findByIdAndRemove(id, (err,removeBlog)=>{
    if (err) {
      res.send(err);
    } else {
      res.redirect('/blog')
    }
  })
})

//PUT


module.exports = router
