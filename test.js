const Resource = require('./models/resource.js');
const Topic = require('./models/topics.js');

const mongoose = require('mongoose')
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

const testing = () =>{
  Resource.create({url:'testing'},(err,test)=>{
    if (err) {
      console.log(err);
    } else {
      console.log(test);
    }
  })
}
testing()
