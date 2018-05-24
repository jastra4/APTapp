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
  "ancient healing potion": 127834,
  "ancient mana potion": 127835,
  "ancient rejuvination potion": 127836,
  "draught of raw magic": 127837,
  "sylvan elixir": 127838,
  "skaggldrynk": 127840,
  "potion of deadly grace": 127843,
  "potion of the old war": 127844,
  "astral alchemist stone": 151607,
  "infernal alchemist stone": 127842,
  "surging alchemist stone": 152632,
  "endless tincture of renewed combat": 152634,
  "siren's alchemist stone": 152637,
  "empyrium": 151564,
  "demonsteel bar": 124461,
  "felslate": 123919,
  "felblight": 127759,
  "true iron ore": 109119,
  "infernal brimstone": 124444,
  "rethu's incessant courage": 146667,
  "empyrial breastplate": 151576,
  "demonsteel greaves": 123914,
  "demonsteel helm": 123913,
  "demonsteel armguards": 123917,
  "demonsteel waistguard": 123916,
  "demonsteel pauldrons": 123915,
  "demonsteel breastplate": 123910,
  "demonsteel boots": 123911,
  "demonsteel gauntlets": 123912,
  "flamespike": 136686,
  "terrorspike": 136683,
  "consecrated spike": 136685,
  "gleaming iron spike": 136684,
  "leystone gauntlets": 123893,
  "leystone helm": 123894,
  "leystone boots": 123892,
  "leystone greaves": 123895,
  "leystone breastplate": 123891,
  "leystone pauldrons": 123896,
  "leystone armguards": 123898,
  "leystone waistguard": 123897,
  "monel-hardened helm": 152805,
  "monel-hardened boots": 161881,
  "monel-hardened greaves": 161884,
  "monel-hardened breastplate": 161880,
  "monel-hardened pauldrons": 161885,
  "monel-hardened armguards": 161887,
  "monel-hardened waistguard": 161886,
  "monel-hardened gauntlets": 161882,
  "monel-hardened shanker": 161916,
  "monel-hardened polearm": 161917,
  "monel-hardened deckpounder": 161915,
  "monel-hardened claymore": 161914,
  "monel-hardened cutlass": 152827,
  "monel-hardened shield": 152818,
  "soul fibril": 136689,
  "immaculate fibril": 136691,
  "tailored skullblasters": 144331,
  "rugged skullblasters": 144332,
  "chain skullblasters": 144333,
  "heavy skullblasters": 144334,
  "semi-automagic cranial cannon": 132504,
  "sawed-off cranial cannon": 132505,
  "double-barreled cranial cannon": 132506,
  "ironsight cranial cannon": 132507,
  "shockinator": 136688,
  "blink-trigger headgun": 132500,
  "tactical headgun": 132501,
  "bolt-action headgun": 132502,
  "reinforced headgun": 132503,
  "magnetic discombobulator": 152830,
  "aqual mark": 136692,
  "straszan mark": 136693,
  "prophecy tarot": 128978,
  "empyrial deep crown": 151588,
  "empyrial elemental crown": 151589,
  "empyrial cosmic crown": 151587,
  "empyrial titan crown": 151590,
  "righteous dawnlight medallion": 130242,
  "ancient maelstrom amulet": 130241,
  "blessed dawnlight medallion": 130234,
  "intrepid necklace of prophecy": 130240,
  "maelstrom band": 130230,
  "shadowruby band": 136713,
  "grim furystone gorget": 130244,
  "raging furystone gorget": 130243,
  "prophetic band": 130229,
  "sylvan maelstrom amulet": 130239,
  "dawnlight band": 130231,
  "sorcerous shadowruby pendant": 130233,
  "twisted pandemonite choker": 130235,
  "subtle shadowruby pendant": 130236,
  "tranquil necklace of prophecy": 130237,
  "vindictive pandemonite choker": 130238,
  "skystone pendant": 130227,
  "deep amber pendant": 130226,
  "azsunite pendant": 130228,
  "azsunite loop": 130225,
  "deep amber loop": 130223,
  "skystone loop": 130224,
  "royal quartz loop": 153683,
  "owlseye loop": 153685,
  "amberblaze loop": 153686,
  "tidal amethyst loop": 153684,
  "kubiline ring": 153688,
  "golden beryl ring": 153689,
  "kyanite ring": 153687,
  "vigilance perch": 146668,
  "fiendish shoulderguards": 151577,
  "fiendish spaulders": 151578,
  "dreadleather jerkin": 128884,
  "dreadleather shoulderguard": 128889,
  "dreadleather footpads": 128885,
  "dreadleather gloves": 128886,
  "dreadleather mask": 128887,
  "dreadleather pants": 128888,
  "dreadleather belt": 128890,
  "dreadleather bindings": 128891,
  "gravenscale spaulders": 128905,
  "gravenscale warhelm": 128903 ,
  "gravenscale girdle": 128906,
  "gravenscale armbands": 128907,
  "gravenscale leggings": 128904,
  "gravenscale hauberk": 128900,
  "gravenscale treads": 128901,
  "gravenscale grips": 128902,
  "warhide bindings": 128883,
  "warhide gloves": 128878,
  "warhide mask": 128879,
  "warhide footpads": 128877,
  "warhide shoulderguard": 128881,
  "warhide pants": 128880,
  "warhide belt": 128882,
  "warhide jerkin": 128876,
  "battlebound grips": 128894,
  "battlebound armbands": 128899,
  "battlebound treads": 128893,
  "battlebound spaulders": 128897,
  "battlebound girdle": 128898,
  "battlebound leggings": 128896,
  "battlebound warhelm": 128895,
  "battlebound hauberk": 128892,
  "lightweave breeches": 151571,
  "imbued silkweave slippers": 126996,
  "imbued silkweave pantaloons": 126999,
  "imbued silkweave shade": 127033,
  "imbued silkweave robe": 126995,
  "imbued silkweave flourish": 127034,
  "imbued silkweave gloves": 126997,
  "imbued silkweave hood": 126998,
  "imbued silkweave epaulets": 127000,
  "imbued silkweave drape": 127020,
  "imbued silkweave cinch": 127001,
  "imbued silkweave bracers": 127002,
  "imbued silkweave cover": 127019,
  "silkweave slippers": 126988,
  "silkweave pantaloons": 126991,
  "silkweave shade": 127031,
  "silkweave robe": 126987,
  "silkweave flourish": 127032,
  "silkweave gloves": 126989,
  "silkweave hood": 126990,
  "silkweave epaulets": 126992,
  "silkweave drape": 127017,
  "silkweave cinch": 126993,
  "silkweave bracers": 126994,
  "silkweave cover": 127016,
  "bear tartare": 133576,
  "deep-fried mossgill": 133561,
  "dried mackerel strips": 133575,
  "faronaar fizz": 133563,
  "fighter chow": 133577,
  "pickled stormray": 133562,
  "salt and pepper shank": 133557,
  "spiced rib roast": 133564,
  "suramar surf and turf": 133566,
  "koi-scented stormray": 133568,
  "barracuda mrglgagh": 133567,
  "leybeque ribs": 133565,
  "drogbar-style salmon": 133569,
  "azshari salad": 133571,
  "seed-battered fish plate": 133573,
  "nightborn delicacy platter": 133572,
  "the hungry magister": 133570,
  "fishbrul special": 133574,
  "crispy bacon": 133681,
  "hearty feast": 133578,
  "spiced falcosaur omelet": 142334,
  "slice of bacon": 133680,
  "wildfowl egg": 124121,
  "leyblood": 124120,
  "big gamy ribs": 124119,
  "fatty bearsteak": 124118,
  "lean shank": 124117,
  "mossgill perch": 124108,
  "highmountain salmon": 124109,
  "stormray": 124110,
  "runescale koi": 124111,
  "black barracuda": 124112,
  "cursed queenfish": 124107,
  "silver mackerel": 133607,
  "leyscale koi": 143748,
  "silkweave splint": 133942,
  "silkweave bandage": 133940,
  "embersilk cloth": 53010,
  "roseate pigment": 129032,
  "sallow pigment": 129034,
  "cerulean pigment": 114931,
  "chaos crystal": 124442,
  "leylight shard": 124441,
  "arkhana": 124440,
  "luminous shard": 111245,
  "fiendish leather": 151566,
  "raw beast hide": 110609,
  "stormscale": 124115,
  "unbroken claw": 124438,
  "stonehide leather": 124113,
  "unbroken tooth": 124439,
  "quick dawnlight": 130220,
  "deadly deep chemirine": 151580,
  "quick lightsphene": 151583,
  "masterful argulite": 151584,
  "versatile labradorite": 151585,
  "versatile maelstrom sapphire": 130221,
  "masterful shadowruby": 130222,
  "deadly eye of prophecy": 130219,
  "insightful rubellite": 153714,
  "straddling viridium": 153715,
  "deadly deep amber": 130215,
  "quick azsunite": 130216,
  "versatile skystone": 130217,
  "chemirine": 151720,
  "hesselian": 151721,
  "florid malachite": 151722,
  "lightsphene": 151719,
  "dawnlight": 130180,
  "furystone": 130178,
  "pandemonite": 130181,
  "maelstrom sapphire": 130182,
  "shadowruby": 130183,
  "felhide": 124116,
  "argulite": 151718,
  "nethershard essence": 146659,
  "labradorite": 151579,
  "auto-hammer": 132514,
  "failure detection pylon": 132515,
  "reaves battery": 132523,
  "foxflower flux": 124436,
  "chaotic spinel": 130175,
  "sangrite": 130172,
  "falcosaur egg": 142336,
  "sharp spritethorn": 127681,
  "pristine falcosaur feather": 142335,
  "lightweave cloth": 151567,
  "rich illusion dust": 156930,
  "runic catgut": 127037,
  "heated hard leystone bar": 124395,
  "heated leystone bar": 128777,
  "leystone bar": 124007,
  "leystone shard": 124420,
  "heated hard leystone ingot": 124423,
  "hard leystone ingot": 124422,
  "red-hot leystone bar": 124426,
  "gem chip": 130203,
  "tanned stonehide leather": 136539,
  "stonehide leather lining": 130872,
  "shaved stonehide pelt": 130869,
  "fresh stonehide pelt": 130868,
  "the sentinel's eternal refuge": 146669,
  "celumbra, the night's dichotomy": 146666,
  "saber's eye of agility": 130247,
  "masterful queen's opal": 130218,
  "enchanter's umbral wand": 161925,
  "saber''s eye": 130245,
  "saber's eye of strength": 130246,
  "shal'dorei silk": 124437,
  "queen's opal pendant": 136712,
  "saber's eye of intellect": 130248,
}

app.get('/queryDB', (req, res) => {
// updating process start
  // for (var prop in catalog2) {
    // dbMethod.updateyMySQL(prop, catalog2[prop]);
  // }
// updateing process end

  let itemName = req.query.item.toLowerCase();

  dbMethod.searchMySQL(itemName, (result) => {
    if (result !== null && result !== undefined && result.length > 0) {
      let ID = result[0].I_ID;

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
  // this will be deleted
//   if (catalog[item] !== undefined) {
//     item = catalog[item];
//   }

// 	dbMethod.selectAll(item, (data) => {
//       // SORT (assumes the stamp prop to be an iso date)
//       data.sort(function (a, b) {
//         if (a.stamp > b.stamp) {
//           return -1;
//         } else if (b.stamp > a.stamp) {
//           return 1;
//         } else if (a.stamp === b.stamp) {
//           return 0;
//         }
//       });
//       // FORMAT
//       data.forEach((isoDate, i, data) => {
//         data[i].stamp = { date: dateFormat(JSON.parse(isoDate.stamp), 'dd-mmm-yy') };
//       });
//       res.send(data);   
//     //}
// 	});
// })

/************************************************************/
/************************************************************/

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅  aptAPP listening on port ${port}!`));
