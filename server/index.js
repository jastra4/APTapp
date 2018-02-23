/************************************************************/
// Node Imports
/************************************************************/

const express = require('express');
const bodyParser = require('body-parser');
const dbMethod = require('../database/index.js');
const dateFormat = require('dateformat');
const blizzard = require('blizzard.js').initialize({ apikey: process.env.BLIZZARD_API });
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
 			// const stamp = dateFormat(new Date(), 'dddd, mmm dS, h:MM TT');
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
	dbMethod.selectAll(item, (data) => {
		res.send(data);
	});
})

/************************************************************/
/************************************************************/

let port = process.env.PORT || 1128;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
