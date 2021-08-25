// =============================
//         DEPENDENCIES
// =============================
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Resource = require('./models/resource.js')

mongoose.connect('mongodb://localhost:27017/bookmarkbar',{useNewUrlParser: true});

const db = mongoose.connection
db.once('open',()=>{
  console.log('connected to mongo');
});


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
  Resource.find({}, (err, allTopics) => {
    if (err) {
      res.send(err)
    } else {
    res.render('index.ejs', {resources: allTopics})
    }
  })
})













app.use(express.static(__dirname + '/public'));
// =============================
//           LISTEN

app.listen(port, ()=>{
  console.log("listening on port", port);
})
