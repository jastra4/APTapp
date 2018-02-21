/************************************************************/
// Startup Process
/************************************************************/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/edge');

var db = mongoose.connection;
// to start in terminal with no authorization restrictions:
// mongod --port 27017 --dbpath /data/db

db.on('error', function(err) {
  console.log('mongoose connection error ', err);
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

/************************************************************/
// Schemas
/************************************************************/

var ahSchema = mongoose.Schema({
  id: {
    type: String,
    unique: false,
    required: false
  },
  auc: Number,
  bid: Number,
  buyout: Number,
  context: Number,
  item: Number,
  owner: String,
  ownerRealm: String,
  quantity: Number,
  rand: Number,
  seed: Number,
  timeLeft: String
});
// var AH = mongoose.model('AH', ahSchema);

/************************************************************/
// Inserts 
/************************************************************/

const insertBatch = (data, batch) => {
console.log('insertBatch: ', batch);
let test = new Date();
test = JSON.stringify(test);
mongoose.connection.db.listCollections({name: test})
    .next(function(err, collinfo) {
        if (collinfo) {
          console.log(`Collection ${collinfo.name} already exists.`)
        } else {
          const newBatch = mongoose.model(test, ahSchema);
          const dump = JSON.parse(data);
          console.log('insertBatch running on: ', dump.auctions.length);
          newBatch.insertMany(dump.auctions);
        }
    });
}

// each batch should be a new collection
// each batch is roughly 23.1 megabytes / 23,100 kilobytes
// mlab offers 500 megabytes free

/************************************************************/
// Queries
/************************************************************/

var selectAll = function(item, callback) {
  mongoose.connection.db.listCollections().toArray(function(err, collInfos) {
    console.log(collInfos[collInfos.length-1].name);
    const lastBatch= collInfos[collInfos.length-1].name;
    const coll = mongoose.model(lastBatch, ahSchema);
    coll.find({"item": item}, function(err, results) {
      console.log('results: ', results)
      console.log('err: ', err)
      if(err) {
        callback(err);
      } else {
        callback(results);
      }
    })
  })
};

/************************************************************/
// Node Exports
/************************************************************/

module.exports = {
  insertBatch,
  selectAll
}