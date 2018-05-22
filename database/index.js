/************************************************************/
// mySQL
/************************************************************/

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: "test",
});

connection.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to sql database.');

  // let sql = "CREATE TABLE ITEMS ( I_ID INTEGER NOT NULL UNIQUE, I_NAME VARCHAR(50) NOT NULL UNIQUE, PRIMARY KEY(I_ID) )"
  // connection.query(sql, (err, result) => {
  //   if (err) {
  //     console.log('ITEMS Table Error ', err);
  //     connection.end();
  //   } else {
  //     console.log("ITEMS Table created");
  //   }
  // });

  // enter all names as lowercase
  // var update = "INSERT INTO ITEMS (I_ID, I_NAME) VALUES (123918, 'Leystone Ore')";
  // connection.query(update, function (err, result) {
  //   if (err) {
  //     console.log('insert error ', err);
  //     connection.end();
  //   } else {
  //     console.log("1 record inserted");
  //   };
  // });

  // connection.end();
});

var searchMySQL = (itemName, callback) => {
  console.log('Search term: ', itemName);
  connection.query("SELECT * FROM ITEMS WHERE I_NAME LIKE '" + itemName + "'", function (err, result, fields) {
    if (err) {
      console.log('query error ', err);
      callback(null);
      connection.end();
    } else {
      // console.log(result);
      callback(result)
      connection.end();
    };
  });
}

/************************************************************/
// Startup Process
/************************************************************/
// to start in terminal with no authorization restrictions:
// mongod --port 27017 --dbpath /data/db

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
            // could change null to []
            hist.results = [];
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
  deleteBatch,
  searchMySQL,
}
