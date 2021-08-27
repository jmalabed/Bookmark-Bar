// =============================
//         DEPENDENCIES
// =============================
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const Resource = require('./models/resource.js');
// const Topic = require('./models/topics.js');
// const topicData = require('./data/topicData.js')
// const resourceData = require('./data/resourceData.js')
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
//     mongoose.connection.close();
//   });


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
app.use((req, res, next) => {
  console.log('run all routes')
  next();
})
// =============================
//         ROUTING
// =============================
<<<<<<< HEAD
// //new route topics
// app.get('/bar/new', (req,res)=> {
//   res.render('new.ejs')
// })
//
//
// //show route
// app.get('/bar/:id', (req,res)=>{
//   id = req.params.id
//   Topic.findById(id,(err,foundTopic)=>{
//     Resource.find({}, (err, allResources)=> {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render('show.ejs', {
//           resources:allResources,
//           topic:foundTopic
//         })
//       }
//     })
//   })
// })
//
// // new route resources
// app.get('/bar/resource/new',(req,res)=>{
//   res.render('newResource.ejs')
// })
//
//
// //index route
// app.get('/bar',(req,res)=>{
//   Topic.find({}, (err, allTopics) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(allTopics);
//         res.render('index.ejs', {topics:allTopics})
//     }
//   })
// })
//
// // post route
// app.post('/bar',(req,res)=>{
//   Topic.create(req.body,(err,newTopic)=>{
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect('/bar/')
//     }
//   })
// })
//
// app.post('/bar/:id', (req,res)=>{
//   Resource.create(req.body,(err,newResource)=>{
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect('/bar/:id')
//     }
//   })
// })
//
// // delete routes
// app.delete('/bar/:id',(req,res)=>{
//   id = req.params.id
//   Topic.findByIdAndRemove(id, (err,removeTopic)=>{
//     if (err) {
//       res.send(err);
//     } else {
//       res.redirect('/bar')
//     }
//   })
// })
//
// app.delete('/bar/:id',(req,res)=>{
//   id = req.params.id
//   Resource.findByIdAndRemove(id, (err,removeRsrc)=>{
//     if (err) {
//       res.send(err);
//     } else {
//       res.redirect('/bar/:id')
//     }
//   })
// })
//
// //edit route
// app.get('/bar/:id/edit', (req, res)=>{
// const id = req.params.id
//   Resource.findById(id, (err, foundResource)=>{
//     if(err){
//       res.send(err)
//     } else {
//       res.render('edit.ejs', {resource:foundResource})
//     }
//   })
// })
//
// //update
// app.put('/bar/:id', (req,res)=>{
// const id = req.params.id
// const updatedResourceData = req.body
//
//   Resource.findByIdAndUpdate(id, updatedResourceData, {new: true}, (err,updatedResource) => {
//     if(err){
//       res.send(err)
//     } else {
//       res.redirect('/bar')
//     }
//   })
// })
=======
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
app.get('/bar/:id/new',(req,res)=>{
  id = req.params.id
  Topic.findById(id,(err,foundTopic)=>{
    if (err) {
      console.log(err);
    } else {
      res.render('newResource.ejs',{topic:foundTopic})
    }
  })

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
  console.log('testing testing!');
  console.log(req.body);
  id = req.params.id;
  Resource.create([req.body],(err,newResource)=>{
    if (err) {
      console.log(err);
    } else {
        res.redirect("/bar/"+req.params.id)
      }
    }
  )
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

>>>>>>> submaster


app.use(express.static(__dirname + '/public'));
// =============================
//           CONTROLLERS
const topicsController = require('./controllers/topics/topicController');
app.use('/topics', topicsController);
// const rsrcsController = require('./controllers/resources/rsrcController');
// app.use('/resources', rsrcsController);

// =============================
//           LISTEN

app.listen(port, ()=>{
  console.log("listening on port", port);
})
