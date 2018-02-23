/************************************************************/
// Startup Process
/************************************************************/

var mongoose = require('mongoose');
const keys = require('../server/config/keys');

// local
// mongoose.connect('mongodb://localhost/edge');

// live
mongoose.connect(keys.mongodb.dbURI)
  .then(() => { console.log('✅  Successfully connected to Mongodb'); })
  .catch((e) => { console.error('⚠️ Error connected to MongoDB: ', e); });

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

const dumpSchema = mongoose.Schema({
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
  timeLeft: String,
});
// const Dumps = mongoose.model('dumps', dumpSchema);

/************************************************************/
// Inserts 
/************************************************************/

const insertBatch = (data) => {
  const dumpId = JSON.stringify(new Date());
  mongoose.connection.db.listCollections({name: dumpId})
    .next(function(err, doc) {
      if (doc) {
        console.log('dump already exists');
      } else {
        const newDump = mongoose.model(dumpId, dumpSchema);
        data = JSON.parse(data);
        console.log('inserting: ', data.auctions.length);
        newDump.insertMany(data.auctions);
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
  mongoose.connection.db.listCollections().toArray(function(err, docs) {
    let list = [];
    docs.forEach((doc) => {
      let col = mongoose.model(doc.name, dumpSchema);
      query = col.find({"item": item}).sort('-created');
      query.exec((err, results) => {
        if (err) {
          console.log('err: ', err);
        } else {
          list.push(results);
        }
      });
    });
    setTimeout(() => {
      callback(list);
    }, 3000);
  })
};

/************************************************************/
// Node Exports
/************************************************************/

module.exports = {
  insertBatch,
  selectAll
}
