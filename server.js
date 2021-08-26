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
//         INSTANTIATE
// =============================
// ** RUN THIS CODE ONE TIME TO BUILD YOUR DATABASE IN MONGODB! **
// Comment out after
// Topic.insertMany(topicData,(err,topics)=>{
//   if (err) {console.log(err)};
//     console.log('added provided topic data', topics);
//   });
//
//
// Resource.insertMany(resourceData,(err,resources)=>{
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('added provided resource data', resources);
//     mongoose.connection.close();
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


//show route
app.get('/bar/:id', (req,res)=>{
  Resource.find({}, (err, callback)=> {
    if (err) {
      console.log(err);
    } else {
        res.render('show.ejs', {resources:callback})
    }

  })
})


//index route
app.get('/bar',(req,res)=>{
  Topic.find({}, (err, callback) => {
    if (err) {
      console.log(err);
    } else {
      console.log(callback);
        res.render('index.ejs', {topics:callback})
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


app.use(express.static(__dirname + '/public'));
// =============================
//           LISTEN

app.listen(port, ()=>{
  console.log("listening on port", port);
})
