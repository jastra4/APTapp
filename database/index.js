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

  // let drp = "DROP TABLE ITEMS";
  // connection.query(drp, (err, result) => {
  //   if (err) {
  //     console.log('ITEMS drop Error ', err);
  //   } else {
  //     console.log("ITEMS Table dropped");
  //   }
  // });

  // let profs = "CREATE TABLE PROFESSIONS ( ID INTEGER NOT NULL UNIQUE, NAME VARCHAR(50) NOT NULL UNIQUE, PRIMARY KEY(ID) )"
  // connection.query(profs, (err, result) => {
  //   if (err) {
  //     console.log('PROFESSIONS Table Error ', err);
  //   } else {
  //     console.log("PROFESSIONS Table created");
  //   }
  // });

  // let cats = "CREATE TABLE CATEGORIES ( ID INTEGER NOT NULL UNIQUE, NAME VARCHAR(50) NOT NULL UNIQUE, PRIMARY KEY(ID) )"
  // connection.query(cats, (err, result) => {
  //   if (err) {
  //     console.log('CATEGORIES Table Error ', err);
  //   } else {
  //     console.log("CATEGORIES Table created");
  //   }
  // });

  // let items = "CREATE TABLE ITEMS ( ID INTEGER NOT NULL UNIQUE, NAME VARCHAR(50) NOT NULL UNIQUE, C_ID INTEGER NOT NULL, P_ID INTEGER NOT NULL, PRIMARY KEY(ID), FOREIGN KEY (C_ID) REFERENCES CATEGORIES(ID), FOREIGN KEY (P_ID) REFERENCES PROFESSIONS (ID) )"
  // connection.query(items, (err, result) => {
  //   if (err) {
  //     console.log('ITEMS Table Error ', err);
  //   } else {
  //     console.log("ITEMS Table created");
  //   }
  // });
});

var addProfessionSQL = (id, name) => {
  name = name.replace("'", "''");
  var update = "INSERT INTO PROFESSIONS (ID, NAME ) VALUES (" + id + ",'" + name + "')";
  connection.query(update, function (err, result) {
    if (err) {
      console.log('insert error ', err);
    } else {
      console.log("1 record inserted for ", name);
    };
  })
}

var addTypeSQL = (id, name) => {
  name = name.replace("'", "''");
  var update = "INSERT INTO CATEGORIES (ID, NAME ) VALUES (" + id + ",'" + name + "')";
  connection.query(update, function (err, result) {
    if (err) {
      console.log('insert error ', err);
    } else {
      console.log("1 record inserted for ", name);
    };
  })
}

var addItemSQL = (id, name, category, profession) => {
  name = name.replace("'", "''");
  var update = "INSERT INTO ITEMS (ID, NAME, C_ID, P_ID ) VALUES (" + id + ",'" + name + "','" + category + "','" + profession + "')";
  connection.query(update, function (err, result) {
    if (err) {
      console.log('insert error ', err);
    } else {
      console.log("1 record inserted for ", name);
    };
  })
}

var deleteItemSQL = (itemName) => {
  itemName = itemName.replace("'", "''");
  connection.query("DELETE FROM ITEMS WHERE NAME LIKE '" + itemName + "'", (err) => {
    if (err) {
      console.log('failed to delete ', itemName);
    } else {
      console.log('deleted ', itemName);
    }
  }) 
}

// get an item's id based on name
var lookupItemID = (itemName, callback) => {
  let test = itemName.replace("'", "''");
  connection.query("SELECT * FROM ITEMS WHERE NAME LIKE '" + test + "'", function (err, result, fields) {
    if (err) {
      console.log('query error ', err);
      callback(null);
    } else {
      callback(result)
    };
  });
}

// get a list of item names based on profession(s) and category
var lookupItems = (professions, category, callback) => {
  let customIN = '';
  professions.forEach((prof, i, profs) => {
    connection.query("select ID from PROFESSIONS where NAME = '" + prof + "'", function (err, result, fields) {
      if (err) {
        console.log('query error ', err);
      } else {
        customIN += result[0].ID + ', ';
        if (i === profs.length - 1) {
          customIN = customIN.substring(0, customIN.length - 2);
          connection.query("SELECT NAME FROM ITEMS WHERE C_ID IN (select ID from CATEGORIES where NAME = '" + category + "') AND P_ID IN (" + customIN + ")", function (err, result, fields) {
            if (err) {
              console.log('query error ', err);
              callback(null);
            } else {
              callback(result)
            };
          });
        }
      };
    });
  })
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
  addProfessionSQL,
  addTypeSQL,
  addItemSQL,
  deleteItemSQL,
  lookupItemID,
  lookupItems,
  insertBatch,
  selectAll,
  deleteBatch,
}
