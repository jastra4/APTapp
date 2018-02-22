/************************************************************/
// Node Imports
/************************************************************/

const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
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

app.get('/queryDB', (req, res) => {
	const { item } = req.query;
	// git required materials from blizz item api
	// https://us.api.battle.net/wow/item/12417?locale=en_US&apikey=7gh9d3c7n42cwpnakp2xrfgucvh8ydev
	//helpers.test((result) => {
		dbMethod.selectAll(item, (data) => {
			res.send(data);
		})
	//});
	// blizzard.wow.item({ itemId: item })
	//   .then((response) => {
	//   	console.log('queryDB response ', response);
	//   })
	//   .catch((err) => {
	// 		console.log('err ', err);
	//   });
})

/************************************************************/
/************************************************************/

let port = process.env.PORT || 1128;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
