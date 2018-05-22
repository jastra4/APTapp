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
// Cronjob
/************************************************************/

// const schedule = require('node-schedule');

// schedule.scheduleJob('0 * * * *', function () {
//   app.get('/updateDB', (req, res) => {
//     blizzard.wow.auction({ realm: 'Thrall', origin: 'US' })
//       .then(response => {
//         rp(response.data.files[0].url).then((results) => {
//           insertBatch(results)
//         }).catch((err) => {
//           console.log('updateDB error: ', err);
//         })
//       })
//       .catch((err) => {
//         console.log('failed to reach blizz ', err);
//         res.sendStatus(500)
//       });
//   })
// });

/************************************************************/
// Startup Process
/************************************************************/

const app = express();
app.use(express.static(__dirname + '/../client/dist'));

/************************************************************/
// Routes
/************************************************************/

app.post('/cronTest', (req, res) => {
  console.log('cron test triggered');
  res.send('cron job ran successfully');
})

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

app.post('/updateDB', (req, res) => {
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
  "aethril": 124101,
  "astral glory": 151565,
  "astral healing potion": 152615,
  "avalanche elixir": 127839,
  "darkmoon daggermaw": 124669,
  "dreamleaf": 124102,
  "felwort": 124106,
  "flask of ten thousand scars": 127850,
  "flask of the countless armies": 127849,
  "flask of the seventh demon": 127848,
  "flask of the whispered pact": 127847,
  "fjarnskaggl": 124104,
  "foxflower": 124103,
  "lavish suramar feast": 133579,
  "leytorrent potion": 127846,
  "potion of prolonged power": 142117,
  "starlight rose": 124105,
  "skystep potion": 127841,
  "unbending potion": 127845,
  "yseralline seed": 128304,
}

app.get('/queryDB', (req, res) => {
  // updating process start
  // for (var prop in catalog) {
  //   dbMethod.updateyMySQL(prop, catalog[prop]);
  // }
  // updateing process end

  let item = req.query.item.toLowerCase();
  dbMethod.searchMySQL(item, (result) => {
    if (result !== null) {
      // pass result to selectAll
      console.log('Item ID: ', result);
    } else {
      // pass item to selectAll (in case they enter the item ID instead of the name)
      console.log('Item ID: ', null);
    }
  });

  // this will be deleted
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
    //}
	});
})

/************************************************************/
/************************************************************/

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅  aptAPP listening on port ${port}!`));
