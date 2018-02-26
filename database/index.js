// to start in terminal with no authorization restrictions:
// mongod --port 27017 --dbpath /data/db

/************************************************************/
// Startup Process
/************************************************************/

const mongoose = require('mongoose');
mongoose.Promise = require("bluebird");

// mongoose.connect('mongodb://localhost/edge');
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
  .then(() => { console.log('✅  Successfully connected to', process.env.MONGODB_URI); })
  .catch((e) => { console.error('⚠️ Error connected to MongoDB: ', e); });

const db = mongoose.connection;

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

/************************************************************/
// Inserts 
/************************************************************/

const insertBatch = (data, stamp) => {
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

/************************************************************/
// Queries
/************************************************************/

var selectAll = function(item, callback) {
  mongoose.connection.db.listCollections().toArray(function(err, docs) {
    let list = [];
    let hist = {};
    docs.forEach((doc) => {
      if (doc.name !== 'system.indexes') {
        let col = mongoose.model(doc.name, dumpSchema);
        console.log('col ', col);
        query = col.find({"item": item}).sort('-created');
        query.exec((err, results) => {
          if (err) {
            console.log('err: ', err);
          } else {
            hist.results = results;
            hist.stamp = doc.name;
            list.push(hist);
            // list.push(results);
          }
        });
      }
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
