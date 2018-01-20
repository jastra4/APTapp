const request = require('request');
const rp = require('request-promise');
const config = require('../config.js');

// inactive
getDumpId = (realm) => {
  return new Promise(function(resolve, reject) {
    const wow = {url: `https://us.api.battle.net/wow/auction/data/${realm}?locale=en_US&apikey=${config.API.Key}`};
    rp(wow)
    .then((dumpId) => {
      resolve(dumpId);
    })
    .catch((err) => {
      reject(err);
    })
  })
}

// inactive
getDataDump = (url) => {
  return new Promise(function(resolve, reject) {
    const wow = {url: url};
    console.log('getDataDump started');
    rp(wow)
    .then((results) => {
      resolve(results);
    })
    .catch((error) => {
      resolve(error)
    })
  })
}

module.exports = {
  getDumpId,
  getDataDump
}