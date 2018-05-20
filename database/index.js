// to start in terminal with no authorization restrictions:
// mongod --port 27017 --dbpath /data/db

/************************************************************/
// Startup Process
/************************************************************/

const mongoose = require('mongoose');
mongoose.Promise = require("bluebird");

// mongoose.connect('mongodb://localhost/edge')
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
  .then(() => { console.log('✅  Successfully connected to mlab mongodb'); })
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
// Insert
/************************************************************/
const dateFormat = require('dateformat');

const insertBatch = (data, stamp) => {
  const dumpId = JSON.stringify(dateFormat(new Date(), "isoDateTime"));
  mongoose.connection.db.listCollections({name: dumpId})
    .next(function(err, doc) {
      if (doc) {
        console.log('dump already exists');
      } else {
        const newDump = mongoose.model(dumpId, dumpSchema);
        data = JSON.parse(data);
        newDump.insertMany(data.auctions);
      }
    });
}

/************************************************************/
// Query
/************************************************************/

var selectAll = function(item, callback) {
  mongoose.connection.db.listCollections().toArray(function(err, docs) {
    let list = [];
    let j = 0;
    docs.forEach((doc, i, docs) => {
      if (doc.name !== 'system.indexes') {
        let col = mongoose.model(doc.name, dumpSchema);
        col.find({"item": item}, (err, results) => {
          if (err) {
            let hist = {};
            hist.results = null;
            hist.stamp = doc.name;
            list.push(hist);
            j++;
            if (j === docs.length - 1) {
              callback(list);
            }  
          } else {
            let hist = {};
            hist.results = results;
            hist.stamp = doc.name;
            list.push(hist);
            j++;
            if (j === docs.length-1) {
              callback(list);
            }  
          }        
        });
      }
    });
  })
};

/************************************************************/
// Delete
/************************************************************/

// This function was going to be run by a worker to keep the database within its size limits.
// However, deleting files does not remove their footprint. The database would still need to be manually compacted every day.
const deleteBatch = function() {
  console.log('this should delete the oldest data dump');
};

/************************************************************/
// Node Exports
/************************************************************/

module.exports = {
  insertBatch,
  selectAll,
  deleteBatch
}
