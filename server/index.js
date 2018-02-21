/************************************************************/
// Node Imports
/************************************************************/

const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js');
const dbMethod = require('../database/index.js');
const config = require('../config.js');
const blizzard = require('blizzard.js').initialize({ apikey: config.API.Key });
const request = require('request');
const rp = require('request-promise');

/************************************************************/
// Startup Process
/************************************************************/

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());
app.use(bodyParser.json());

/************************************************************/
// Routes
/************************************************************/

app.get('/updateDB', (req, res) => {
	const userRegion = req.query.region;
	const userRealm = req.query.realm;
	console.log(`userRegion ${userRegion}`);
	console.log(`userRealm ${userRealm}`);
  blizzard.wow.auction({ realm: userRealm, origin: userRegion })
 .then(response => {
 		const batchId = response.data.files[0].url
 		console.log('batchId: ', batchId);
 		rp(batchId).then((results) => {
 			console.log('rp finished');
 		  console.log('batchId: ', batchId);
			dbMethod.insertBatch(results, batchId)
			res.send(results);
		}).catch((err) => {
			console.log('request error: ', err);
		})
  });		
})

// client asks for db auctions back
app.get('/queryDB', (req, res) => {
	const item = req.query.item;
	dbMethod.selectAll(item, (data)  => {
		res.send(data);
	})
})

/************************************************************/
/************************************************************/

let port = process.env.PORT || 1128;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))