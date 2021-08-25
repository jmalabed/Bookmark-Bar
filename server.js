// =============================
//         DEPENDENCIES
// =============================
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Resource = require('./models/resource.js')
const Topic = require('./models/topics.js')

mongoose.connect('mongodb://localhost:27017/bookmarkbar',{useNewUrlParser: true});

const db = mongoose.connection
db.once('open',()=>{
  console.log('connected to mongo');
});

// =============================
//         SEED DATA
// =============================

// =============================
//           TOPIC
const topData = [
    {
      name: "JavaScript",
      img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
    },
    {
      name: "HTML",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/HTML5_logo_black.svg/2048px-HTML5_logo_black.svg.png"
    },
    {
      name: "CSS",
      img: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png"
    }
]

// =============================
//           RESOURCE
const resourceData = [
  {
    name: "JS Practice problems",
    url: "https://github.com/careercup/CtCI-6th-Edition-JavaScript",
    description: "Practice problems for javascript",
    topicId: "JavaScript"
  },
  {
    name: "W3 Schools",
    description: "Extensive examples and documentation on HTML elements.",
    url: "https://www.w3schools.com/",
    topicId: "HTML"
  },
  {
    name: "MDN CSS Reference",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference",
    description: "Mozilla Developer Network (MDN) offers an exhaustive index of CSS properties and offers code sandboxes to run code snippets.",
    topicId:"CSS"
  }
]



// =============================
//         MIDDLEWARE
// =============================
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
// =============================
//         ROUTING
// =============================
//index route
app.get('/bar',(req,res)=>{
  Topic.find({}, (err, allTopics) => {
    if (err) {
      res.send(err)
    } else {
      console.log('yo')
    res.render('index.ejs', {topics: allTopics})
    }
  })
})











app.use(express.static(__dirname + '/public'));
// =============================
//           LISTEN

app.listen(port, ()=>{
  console.log("listening on port", port);
})
