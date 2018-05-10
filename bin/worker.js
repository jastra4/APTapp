#!/usr/bin/evn node
// "node bin/worker.js" is the command for the heroku job scheduler
const mongoose = require('mongoose');
mongoose.Promise = require("bluebird");

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
  .then(() => { console.log('✅  Successfully connected to', process.env.MONGODB_URI); })
  .catch((e) => { console.error('⚠️ Error connected to MongoDB: ', e); });

const db = mongoose.connection;

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

const blizzard = require('blizzard.js').initialize({ apikey: process.env.BLIZZARD_API });
const rp = require('request-promise');

blizzard.wow.auction({ realm: 'Thrall', origin: 'US' })
.then(response => {
		rp(response.data.files[0].url).then((results) => {
		insertBatch(results)
	}).catch((err) => {
		console.log('updateDB error: ', err);
	})
});		

const dateFormat = require('dateformat');

const insertBatch = (data, stamp) => {
  // const dumpId = JSON.stringify(dateFormat(new Date(), 'dddd, H:MM TT'));
  // const dumpId = JSON.stringify(dateFormat(new Date(), 'm/d/yy H:MM TT Z'));
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

