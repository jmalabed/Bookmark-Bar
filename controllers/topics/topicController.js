const express = require('express')

const router = express.Router()

const Topic = require('../../models/topics.js');
const topicData = require('../../data/topicData.js')

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


module.exports = router
