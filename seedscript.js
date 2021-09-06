//required libs
const MongoClient = require('mongodb').MongoClient;
const topicData = require('./data/topicData.js');
const resourceData = require('./data/resourceData.js')
const blogData = require('./data/blogData.js')

async function seedDB(){
  const uri = "mongodb+srv://jared:WjHAqMJ1ladAdEyo@cluster0.fcmi1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  })

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const blogCollection = client.db("bar").collection("blogs")
    const resourceCollection = client.db("bar").collection("resources")
    const topicCollection = client.db("bar").collection("topics")
    blogCollection.insertMany(blogData);
    resourceCollection.insertMany(resourceData);
    topicCollection.insertMany(topicData);

    console.log('database seeded :)');

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
