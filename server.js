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
const topicData = require('./seeds/topicData.js')
const resourceData = require('./seeds/resourceData.js')
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
    // mongoose.connection.close();
  // });

//
// Resource.insertMany(resourceData,(err,resources)=>{
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('added provided resource data', resources);
    // mongoose.connection.close();
//   }
// })

// =============================
//         MIDDLEWARE
// =============================
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
// =============================
//         ROUTING
// =============================
//new route
app.get('/bar/new', (req,res)=> {
  res.render('new.ejs')
})


//index route
app.get('/bar',(req,res)=>{
  Topic.find({}, (err, callback) => {
      res.render('index.ejs', {topics:callback})
  })
})
//show route
app.get('/bar/:id', (req,res)=>{
  Resource.find({}, (err, callback)=> {
    res.render('show.ejs', {resources:callback})
  })
})











app.use(express.static(__dirname + '/public'));
// =============================
//           LISTEN

app.listen(port, ()=>{
  console.log("listening on port", port);
})
