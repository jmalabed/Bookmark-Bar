// =============================
//         DEPENDENCIES
// =============================
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Resource = require('./models/resource.js');
const Topic = require('./models/topics.js');
const topicData = require('./data/topicData.js')
const resourceData = require('./data/resourceData.js')
// Configuration
const mongoURI = 'mongodb://localhost:27017/'+ 'bar';
const db = mongoose.connection;

//DEPRECATION WARNING:
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connect to Mongo
mongoose.connect( mongoURI );

// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on( 'open' , ()=>{
  console.log('Connection made!');
});


// =============================
//         SEED DATA
// =============================

// =============================
//           TOPIC
// const topicData = [
//     {
//       name: "JavaScript",
//       img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
//     },
//     {
//       name: "HTML",
//       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/HTML5_logo_black.svg/2048px-HTML5_logo_black.svg.png"
//     },
//     {
//       name: "CSS",
//       img: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png"
//     }
// ]

// =============================
//           RESOURCE
// const resourceData = [
//   {
//     name: "JS Practice problems",
//     url: "https://github.com/careercup/CtCI-6th-Edition-JavaScript",
//     description: "Practice problems for javascript",
//     topicId: "JavaScript"
//   },
//   {
//     name: "W3 Schools",
//     description: "Extensive examples and documentation on HTML elements.",
//     url: "https://www.w3schools.com/",
//     topicId: "HTML"
//   },
//   {
//     name: "MDN CSS Reference",
//     url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference",
//     description: "Mozilla Developer Network (MDN) offers an exhaustive index of CSS properties and offers code sandboxes to run code snippets.",
//     topicId:"CSS"
//   }
// ]

// =============================
//         INSTANTIATE
// =============================
// ** RUN THIS CODE ONE TIME TO BUILD YOUR DATABASE IN MONGODB! **
// Comment out after
// Topic.insertMany(topicData,(err,topics)=>{
//   if (err) {console.log(err)};
//     console.log('added provided topic data', topics);
<<<<<<< HEAD
//
//   });
// //
//
=======
//     mongoose.connection.close();
//   });


>>>>>>> submaster
// Resource.insertMany(resourceData,(err,resources)=>{
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('added provided resource data', resources);
//       mongoose.connection.close();
//   }
// })

// =============================
//         MIDDLEWARE
// =============================
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use((req, res, next) => {
  console.log('run all routes')
  next();
})
// =============================
//         ROUTING
// =============================
//new route topics
app.get('/bar/new', (req,res)=> {
  res.render('new.ejs')
})


//show route
app.get('/bar/:id', (req,res)=>{
  id = req.params.id
  Topic.findById(id,(err,foundTopic)=>{
    Resource.find({}, (err, allResources)=> {
      if (err) {
        console.log(err);
      } else {
        res.render('show.ejs', {
          resources:allResources,
          topic:foundTopic
          })
      }
    })
  })
})

// new route resources
app.get('/bar/resource/new',(req,res)=>{
  res.render('newResource.ejs')
})


//index route
app.get('/bar',(req,res)=>{
  Topic.find({}, (err, allTopics) => {
    if (err) {
      console.log(err);
    } else {
      console.log(allTopics);
        res.render('index.ejs', {topics:allTopics})
    }
  })
})

// post route
app.post('/bar',(req,res)=>{
  Topic.create(req.body,(err,newTopic)=>{
    if (err) {
      console.log(err);
    } else {
      res.redirect('/bar/')
    }
  })
})

app.post('/bar/:id', (req,res)=>{
  Resource.create(req.body,(err,newResource)=>{
    if (err) {
      console.log(err);
    } else {
      res.redirect('/bar/:id')
    }
  })
})

// delete route
app.delete('/bar/:id',(req,res)=>{
  id = req.params.id
  Topic.findByIdAndRemove(id, (err,deleteData)=>{
    if (err) {
      console.log(err);
    } else {
      res.redirect('/bar')
    }
  })
})

//edit route
app.get('/bar/:id/edit', (req, res)=>{
const id = req.params.id
  Resource.findById(id, (err, foundResource)=>{
    if(err){
      res.send(err)
    } else {
      res.render('edit.ejs', {resource:foundResource})
    }
  })
})



app.use(express.static(__dirname + '/public'));
// =============================
//           LISTEN

app.listen(port, ()=>{
  console.log("listening on port", port);
})
