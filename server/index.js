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

  //const blizzard = require('blizzard.js').initialize({ apikey: process.env.BLIZZARD_API });

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

// 	const { region, realm }  = req.query;
//   blizzard.wow.auction({ realm: realm, origin: region })
//  .then(response => {
//  		rp(response.data.files[0].url).then((results) => {
// 			dbMethod.insertBatch(results);
// 			res.send(results);
// 		}).catch((err) => {
// 			console.log('updateDB error: ', err);
// 			res.sendStatus(500);
// 		})
//   }).catch(() => {console.log('failed to reach blizz')});		
})

app.get('/queryDB', (req, res) => {
	const { item } = req.query;
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
    // data.forEach((isoDate, i, data) => {
    //   if (i === data.length-1) {
    //     console.log(JSON.parse(isoDate.stamp));
    //     data[i].stamp = dateFormat(JSON.parse(isoDate.stamp), 'm/d/yy H:MM TT Z');
    //   }
    // });

		res.send(data);
	});
})

app.get('/dates', (req, res) => {
  // test data
  const testDates = [];
  var d1 = new Date();
  testDates.push(dateFormat(d1, 'isoDateTime'));
  var d2 = d1.setDate(d1.getDate() - 1);
  testDates.push(dateFormat(d2, 'isoDateTime'));
  var d3 = d1.setDate(d1.getDate() - 2);
  testDates.push(dateFormat(d3, 'isoDateTime'));
  var d4 = d1.setDate(d1.getDate() - 3);
  testDates.push(dateFormat(d4, 'isoDateTime'));
  // sort isodates
  testDates.sort(function (a, b) {
    if (a > b) {
      return -1;
    } else if (b > a) {
      return 1;
    } else if (a === 0) {
      return 0;
    }
  });
  // reformat isodates dates
  testDates.forEach((isoDate, i, testDates) => {
    testDates[i] = dateFormat(isoDate, 'm/d/yy H:MM TT Z');
  });
  res.send(testDates);
})

/************************************************************/
/************************************************************/

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅  aptAPP listening on port ${port}!`));
