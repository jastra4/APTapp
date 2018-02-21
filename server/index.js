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
// TODO:
// handle different factions & realms
app.get('/updateDB', (req, res) => {
	const { region, realm }  = req.query;
  blizzard.wow.auction({ realm: realm, origin: region })
 .then(response => {
 		rp(response.data.files[0].url).then((results) => {
			dbMethod.insertBatch(results)
			res.send(results);
		}).catch((err) => {
			console.log('updateDB error: ', err);
			res.sendStatus(500);
		})
  });		
})

// client asks for db auctions back
app.get('/queryDB', (req, res) => {
	const { item } = req.query;
	dbMethod.selectAll(item, (data)  => {
		res.send(data);
	})
})

/************************************************************/
/************************************************************/

let port = process.env.PORT || 1128;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))