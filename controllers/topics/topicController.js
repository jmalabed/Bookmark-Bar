const express = require('express')

const router = express.Router()

const Topic = require('../../models/topics.js');
const Resource = require('../../models/resource.js');
const topicData = require('../../data/topicData.js');
const resourceData = require('../../data/resourceData.js')

//new route topics
router.get('/new', (req,res)=> {
  res.render('topics/new.ejs')
})


//index route
router.get('/',(req,res)=>{
  Topic.find({}, (err, allTopics) => {
    if (err) {
      console.log(err);
    } else {
      console.log(allTopics);
        res.render('topics/index.ejs', {topics:allTopics})
    }
  })
})

// //show route

router.get('/:id', (req,res)=>{
  id = req.params.id
  Topic.findById(id,(err,foundTopic)=>{
    Resource.find({}, (err, allResources)=> {
      if (err) {
        console.log(err);
      } else {
        res.render('topics/show.ejs', {
          resources:allResources,
          topic:foundTopic
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
      res.render('topics/newR.ejs',{topic:foundTopic})
    }
  })
})

//edit route - GOOD
router.get('/:id/edit', (req, res)=>{
const id = req.params.id
  Resource.findById(id, (err, foundResource)=>{
    if(err){
      res.send(err)
    } else {
      res.render('topics/edit.ejs', {resource:foundResource})
    }
  })
})

// post route
router.post('/',(req,res)=>{
  Topic.create(req.body,(err,newTopic)=>{
    if (err) {
      console.log(err);
    } else {
      res.redirect('/topics')
    }
  })
})

router.post('/:id', (req,res)=>{
  console.log('testing testing!');
  console.log(req.body);
  id = req.params.id;
  Resource.create([req.body],(err,newResource)=>{
    console.log(newResource);
    if (err) {
      console.log(err);
    } else {
      console.log('youre close');
        res.redirect("/topics/"+req.params.id)
      }
    }
  )
})

//UPDATE is BUGGY
router.put('/:id', (req,res)=>{
const id = req.params.id
const updatedResourceData = req.body
  Resource.findByIdAndUpdate(id,updatedResourceData, {new: true}, (err,updatedResource) => {
      res.redirect('/topics')
  })
})


// delete route
// router.delete('/:id',(req,res)=>{
//   id = req.params.id
//   Topic.findByIdAndRemove(id, (err,removeTopic)=>{
//     if (err) {
//       res.send(err);
//     } else {
//       res.redirect('/topics')
//     }
//   })
// })

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
