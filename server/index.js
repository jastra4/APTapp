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

app.get('/viewItems', (req, res) => {
  let profs = req.query.item.split(',');
  let results = {
    'reagent': [],
    'consumable': [],
    'equipment': [],
  };

  if (profs[0] !== '') {
    dbMethod.lookupItems(profs, 'reagent', (list) => {
      results['reagent'] = list;

      dbMethod.lookupItems(profs, 'consumable', (list) => {
        results['consumable'] = list;

        dbMethod.lookupItems(profs, 'equipment', (list) => {
          results['equipment'] = list;
          res.send(results);
        });
      });
    });
  } else {
    res.send(results);
  }

})

app.get('/queryDB', (req, res) => {
// update start
  // for (var prop in items) {
  //   dbMethod.addItemSQL(items[prop].id, prop, items[prop].cat, items[prop].prof);
  // }
// update finish

  let itemName = req.query.item.toLowerCase();

  dbMethod.lookupItemID(itemName, (result) => {
    if (result !== null && result !== undefined && result.length > 0) {
      let ID = result[0].ID;

      dbMethod.selectAll(ID, (data) => {
        data = processData(data);
        res.send(data);
      })
    } else {
      res.sendStatus(400);
    }
  });

  const processData = (data) => {
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

    return data;
  }
})

/************************************************************/
/************************************************************/

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅  aptAPP listening on port ${port}!`));
