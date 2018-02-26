/************************************************************/
// Node Imports
/************************************************************/

const express = require('express');
const dbMethod = require('../database/index.js');
const blizzard = require('blizzard.js').initialize({ apikey: process.env.BLIZZARD_API });
const request = require('request');
const rp = require('request-promise');
const dateFormat = require('dateformat');

/************************************************************/
// Startup Process
/************************************************************/

const app = express();
app.use(express.static(__dirname + '/../client/dist'));

/************************************************************/
// Routes
/************************************************************/

app.get('/updateDB', (req, res) => {
	const newStamp = dateFormat(new Date(), 'dddd, HH:MM TT'); // x
	const dump = {}; // x
	const { region, realm }  = req.query;
  blizzard.wow.auction({ realm: realm, origin: region })
 .then(response => {
 		rp(response.data.files[0].url).then((results) => {
 			dump.results = results; // x
 			dump.stamp = newStamp; // x
			// dbMethod.insertBatch(results); // results
			res.send(dump); // results
		}).catch((err) => {
			console.log('updateDB error: ', err);
			res.sendStatus(500);
		})
  });		
})

app.get('/queryDB', (req, res) => {
	const { item } = req.query;
	dbMethod.selectAll(item, (data) => {
		res.send(data);
	});
})

/************************************************************/
/************************************************************/

let port = process.env.PORT || 1128;
app.listen(port, () => console.log(`✅  aptAPP listening on port ${port}!`));
