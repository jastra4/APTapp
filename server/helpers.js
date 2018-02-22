const request = require('request');
const rp = require('request-promise');
const config = require('../config.js');

// inactive
test = () => {
  // return new Promise(function(resolve, reject) {
    const wow = {url: 'https://us.api.battle.net/wow/item/12417?locale=en_US&apikey=7gh9d3c7n42cwpnakp2xrfgucvh8ydev'};
    rp(wow)
    .then((res) => {
      console.log('res ', res);
    })
    .catch((err) => {
      console.log('err ', err);
    })
  // })
}

// // inactive
// getDataDump = (url) => {
//   return new Promise(function(resolve, reject) {
//     const wow = {url: url};
//     console.log('getDataDump started');
//     rp(wow)
//     .then((results) => {
//       resolve(results);
//     })
//     .catch((error) => {
//       resolve(error)
//     })
//   })
// }

module.exports = {
  test,
}