const express = require('express')

const router = express.Router()

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


//testing ejs and formatting

router.get('/format-test',(req,res)=>{
  res.render("format-test.ejs")
})


//new route topics
router.get('/newT',isAuthenticated, (req,res)=> {
  res.render('topics/newT.ejs',{user:req.session.currentUser})
})


//index route
router.get('/',(req,res)=>{
  Topic.find({}, (err, allTopics) => {
    if (err) {
      console.log(err);
    } else {
        res.render('topics/index.ejs', {
          topics:allTopics,
          user:req.session.currentUser})
    }
  })
})

// show route

router.get('/:id', (req,res)=>{
  id = req.params.id
  Topic.findById(id,(err,foundTopic)=>{
    Resource.find({}, (err, allResources)=> {
      if (err) {
        console.log(err);
      } else {
        res.render('topics/show.ejs', {
          resources:allResources,
          topic:foundTopic,
          user:req.session.currentUser
        }
      )}
    })
  })
})

// new route resources
router.get('/:id/new',(req,res)=>{
  id = req.params.id
  Topic.findById(id,(err,foundTopic)=>{
    if (err) {
      console.log(err);
    } else {
      res.render('topics/newR.ejs',{
        topic:foundTopic,
        user: req.session.currentUser
      })
    }
  })
})

//edit route
router.get('/:topicId/:resourceId/edit',isAuthenticated, (req, res)=>{
  const rId = req.params.resourceId
  Topic.findById(req.params.topicId, (err,foundTopic)=>{
    Resource.findById(rId, (err, foundResource)=>{
      if(err){
        res.send(err)
      } else {
        res.render('topics/edit.ejs', {
          resource:foundResource,
          topic: foundTopic,
          user: req.session.currentUser
        })
      }
    })
  })
})

// post route
router.post('/',(req,res)=>{
  Topic.find({"name":req.body.name},(err,foundTopic)=>{
    if (foundTopic.name === req.body.name) {
      Topic.create(req.body,(err,newTopic)=>{
        if (err) {
          console.log(err);
        } else {
          res.redirect('/topics')
        }
      })
    } else {
      res.send(`
        <h1>This topic already exists</h1>
        <p><a href = "/topics">Return to topics page</a>
        `)
    }
  })

})

router.post('/:id', (req,res)=>{
  id = req.params.id;
  Resource.create([req.body],(err,newResource)=>{
    if (err) {
      console.log(err);
    } else {
        res.redirect("/topics/"+req.params.id)
      }
    }
  )
})

// Put route UPDATE
router.put('/:tId/:rId', (req,res)=>{
const resourceId = req.params.rId
const topicId = req.params.tId
const updatedResourceData = req.body
  Resource.findByIdAndUpdate(resourceId,updatedResourceData, (err,updatedResource) => {
      res.redirect('/topics/'+topicId)
  })
})

// Update route for likes
router.put('/:topicId/:resourceId/like',(req,res)=>{
  rId = req.params.resourceId
  req.body.likes++
  Resource.findByIdAndUpdate(rId,req.body,(err,foundResource)=>{
    // res.send('testing in progress')
    res.redirect('/topics/'+req.params.topicId)
  })
})

// Update route for comments
router.put('/:topicId/:resourceId/comment',(req,res)=>{
  rId = req.params.resourceId;
  newComment = req.body.comments
  // req.body.comments.push(req.body)
  Resource.findByIdAndUpdate(rId,{$push: {comments:req.body.comments}},(err,foundResource)=>{
    if (err) {
      console.log(err);
    } else {
      res.redirect('/topics/'+req.params.topicId)
    }
  })
})

// delete route
router.delete('/:id',(req,res)=>{
  id = req.params.id
  Topic.findByIdAndRemove(id, (err,removeTopic)=>{
    if (err) {
      res.send(err);
    } else {
      res.redirect('/topics')
    }
  })
})

router.delete('/:id',(req,res)=>{
  id = req.params.id
  Resource.findByIdAndRemove(id, (err,removeResource)=>{
    if (err) {
      res.send(err);
    } else {
      res.redirect('/topics')
    }
  })
})


module.exports = router
