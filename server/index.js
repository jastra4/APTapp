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
  blizzard.wow.auction({ realm: 'Thrall', origin: 'US' })
    .then(response => {
      rp(response.data.files[0].url).then((results) => {
        insertBatch(results)
      }).catch((err) => {
        console.log('updateDB error: ', err);
      })
    })
    .catch((err) => {
      console.log('failed to reach blizz ', err);
      res.sendStatus(500)
    });				
})

const catalog = {
  "Aethril": 124101,
  "Astral Glory": 151565,
  "Astral Healing Potion": 152615,
  "Avalanche Elixir": 127839,
  "Darkmoon Daggermaw": 124669,
  "Dreamleaf": 124102,
  "Felwort": 124106,
  "Fjarnskaggl": 124104,
  "Foxflower": 124103,
  "Leytorrent Potion": 127846,
  "Starlight Rose": 124105,
  "Lavish Suramar Feast": 133579,
  "Unbending Potion": 127845,
  "Yseralline Seed": 128304,
}

app.get('/queryDB', (req, res) => {
  let { item } = req.query;
  if (catalog[item] !== undefined) {
    item = catalog[item];
  }

	dbMethod.selectAll(item, (data) => {

    // SORT (assumes the stamp prop to be an iso date)
    data.sort(function (a, b) {
      if (a.stamp > b.stamp) {
        return -1;
      } else if (b.stamp > a.stamp) {
        return 1;
      } else if (a.stamp === b.stamp) {
        return 0;
      }
    });
    // FORMAT
    data.forEach((isoDate, i, data) => {
      data[i].stamp = { date: dateFormat(JSON.parse(isoDate.stamp), 'dd-mmm-yy') };
    });

		res.send(data);
	});
})

/************************************************************/
/************************************************************/

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅  aptAPP listening on port ${port}!`));
