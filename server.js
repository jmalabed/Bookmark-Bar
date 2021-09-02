// =============================
//         DEPENDENCIES
// =============================
const express = require('express')
const app = express()

const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config()
const port = process.env.PORT||3000
const session=require('express-session')

// const Resource = require('./models/resource.js');
// const Topic = require('./models/topics.js');
// const topicData = require('./data/topicData.js')
// const resourceData = require('./data/resourceData.js')
// Configuration
const MONGODB_URI = process.env.MONGODB_URI||'mongodb://localhost:27017/'+'bar';
const db = mongoose.connection;

//DEPRECATION WARNING:
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}




// Connect to Mongo
mongoose.connect(MONGODB_URI,connectionOptions);

// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on( 'open' , ()=>{
  console.log('Connection made!');
});
// =============================
//         INSTANTIATE
// =============================

// ** RUN THIS CODE ONE TIME TO BUILD YOUR DATABASE IN MONGODB! **
// Comment out after
// const Topic = require('./models/topics.js');
// const Resource = require('./models/resource.js');
// const topicData = require('./data/topicData.js');
// const resourceData = require('./data/resourceData.js')
//
// Topic.insertMany(topicData,(err,topics)=>{
//   if (err) {console.log(err)};
//     console.log('added provided topic data', topics);
//     // mongoose.connection.close();
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
app.use(express.json());
app.use((req, res, next) => {
  // console.log('run all routes')
  next();
})



app.use(express.static(__dirname + '/public'));


app.use( session({
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))
// =============================
//           CONTROLLERS
const topicsController = require('./controllers/topics/topicController');
app.use('/topics', topicsController);
const blogController = require('./controllers/blog/blogController');
app.use('/blog', blogController);
const userController = require('./controllers/user/userController');
app.use('/user', userController);

// =============================
//         ROUTING
// =============================
app.get('/', (req, res)=> {
  res.render('home.ejs',{
    user:req.session.currentUser
  })
});

app.get('/about', (req, res)=>{
  res.render('about.ejs',{
    user:req.session.currentUser
  })
});





// =============================
//           LISTEN

app.listen(port, ()=>{
  console.log("listening on port", port);
})
