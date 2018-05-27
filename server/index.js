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
    dbMethod.searchMySQL2(profs, 'reagent', (list) => {
      results['reagent'] = list;

      dbMethod.searchMySQL2(profs, 'consumable', (list) => {
        results['consumable'] = list;

        dbMethod.searchMySQL2(profs, 'equipment', (list) => {
          results['equipment'] = list;
          res.send(results);
        });
      });
    });
  } else {
    res.send(results);
  }

})

// app.get('/updateDB', (req, res) => {
//   blizzard.wow.auction({ realm: 'Thrall', origin: 'US' })
//     .then(response => {
//       rp(response.data.files[0].url).then((results) => {
//         insertBatch(results)
//       }).catch((err) => {
//         console.log('updateDB error: ', err);
//       })
//     })
//     .catch((err) => {
//       console.log('failed to reach blizz ', err);
//       res.sendStatus(500)
//     });				
// })

app.get('/queryDB', (req, res) => {
// update start
  // for (var prop in professions) {
  //   dbMethod.updateyMySQLprofessions(prop, professions[prop]);
  // }

  // for (var prop in categories) {
  //   dbMethod.updateyMySQLcategories(prop, categories[prop]);
  // }

  // for (var prop in items) {
  //   dbMethod.updateyMySQLitems(items[prop].id, prop, items[prop].cat, items[prop].prof);
  // }
// update finish


  let itemName = req.query.item.toLowerCase();

  dbMethod.searchMySQL(itemName, (result) => {
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

/************************************************************/
// CATALOGS
/************************************************************/

var professions = {
  1: 'alchemy',
  2: 'blacksmithing',
  3: 'cooking',
  4: 'enchanting',
  5: 'engineering',
  6: 'first aid',
  // 7: 'fishing',
  // 8: 'herbalism',
  9: 'inscription',
  10: 'jewel crafting',
  11: 'leatherworking',
  // 12: 'mining',
  // 13: 'skinning',
  14: 'tailoring',
};

var categories = {
  100: 'reagent',
  101: 'consumable',
  102: 'equipment',
}

var items = {
  "aethril": { id: 124101, prof: 1, cat: 100 },
  "astral glory": { id: 151565, prof: 1, cat: 100 },
  "flask of ten thousand scars": { id: 127850, prof: 1, cat: 101 },
  "infernal alchemist stone": { id: 127842, prof: 1, cat: 102 },
  "felblight": { id: 127759, prof: 2, cat: 100 },
  "felslate": { id: 123919, prof: 2, cat: 100 },
  
  // "astral healing potion": { id: 152615, prof: 'alchemy', cat: 'consumable' },
  // "avalanche elixir": { id: 127839, prof: 'alchemy', cat: 'consumable' },
  // "darkmoon daggermaw": { id: 124669, prof: 'cooking', cat: 'reagent' },
  // "dreamleaf": { id: 124102, prof: 'alchemy', cat: 'reagent' },
  // "felwort": { id: 124106, prof: 'alchemy', cat: 'reagent' },
  // "flask of the countless armies": { id: 127849, prof: 'alchemy', cat: 'consumable' },
  // "flask of the seventh demon": { id: 127848, prof: 'alchemy', cat: 'consumable' },
  // "flask of the whispered pact": { id: 127847, prof: 'alchemy', cat: 'consumable' },
  // "fjarnskaggl": { id: 124104, prof: 'alchemy', cat: 'reagent' },
  // "foxflower": { id: 124103, prof: 'alchemy', cat: 'reagent' },
  // "lavish suramar feast": { id: 133579, prof: 'cooking', cat: 'consumable' },
  // "leytorrent potion": { id: 127846, prof: 'alchemy', cat: 'consumable' },
  // "potion of prolonged power": { id: 142117, prof: 'alchemy', cat: 'consumable' },
  // "starlight rose": { id: 124105, prof: 'alchemy', cat: 'reagent' },
  // "skystep potion": { id: 127841, prof: 'alchemy', cat: 'consumable' },
  // "unbending potion": { id: 127845, prof: 'alchemy', cat: 'consumable' },
  // "yseralline seed": { id: 128304, prof: 'alchemy', cat: 'reagent' },
  // "ancient healing potion": { id: 127834, prof: 'alchemy', cat: 'consumable' },
  // "ancient mana potion": { id: 127835, prof: 'alchemy', cat: 'consumable' },
  // "ancient rejuvination potion": { id: 127836, prof: 'alchemy', cat: 'consumable' },
  // "draught of raw magic": { id: 127837, prof: 'alchemy', cat: 'consumable' },
  // "sylvan elixir": { id: 127838, prof: 'alchemy', cat: 'consumable' },
  // "skaggldrynk": { id: 127840, prof: 'alchemy', cat: 'consumable' },
  // "potion of deadly grace": { id: 127843, prof: 'alchemy', cat: 'consumable' },
  // "potion of the old war": { id: 127844, prof: 'alchemy', cat: 'consumable' },
  // "astral alchemist stone": { id: 151607, prof: 'alchemy', cat: 'equipment' },
  // "surging alchemist stone": { id: 152632, prof: 'alchemy', cat: 'equipment' },
  // "siren's alchemist stone": { id: 152637, prof: 'alchemy', cat: 'equipment' },
  // "empyrium": { id: 151564, prof: 'blacksmithing', cat: 'reagent' },
  // "demonsteel bar": { id: 124461, prof: 'blacksmithing', cat: 'reagent'},

  // "true iron ore": { id: 109119, prof: '', cat: ''},
  // "infernal brimstone": { id: 124444, prof: '', cat: ''},
  // "rethu's incessant courage": { id: 146667, prof: '', cat: ''},
  // "empyrial breastplate": { id: 151576, prof: '', cat: ''},
  // "demonsteel greaves": { id: 123914, prof: '', cat: ''},
  // "demonsteel helm": { id: 123913, prof: '', cat: ''},
  // "demonsteel armguards": { id: 123917, prof: '', cat: ''},
  // "demonsteel waistguard": { id: 123916, prof: '', cat: ''},
  // "demonsteel pauldrons": { id: 123915, prof: '', cat: ''},
  // "demonsteel breastplate": { id: 123910, prof: '', cat: ''},
  // "demonsteel boots": { id: 123911, prof: '', cat: ''},
  // "demonsteel gauntlets": { id: 123912, prof: '', cat: ''},
  // "flamespike": { id: 136686, prof: '', cat: ''},
  // "terrorspike": { id: 136683, prof: '', cat: ''},
  // "consecrated spike": { id: 136685, prof: '', cat: ''},
  // "gleaming iron spike": { id: 136684, prof: '', cat: ''},
  // "leystone gauntlets": { id: 123893, prof: '', cat: ''},
  // "leystone helm": { id: 123894, prof: '', cat: ''},
  // "leystone boots": { id: 123892, prof: '', cat: ''},
  // "leystone greaves": { id: 123895, prof: '', cat: ''},
  // "leystone breastplate": { id: 123891, prof: '', cat: ''},
  // "leystone pauldrons": { id: 123896, prof: '', cat: ''},
  // "leystone armguards": { id: 123898, prof: '', cat: ''},
  // "leystone waistguard": { id: 123897, prof: '', cat: ''},
  // "monel-hardened helm": { id: 152805, prof: '', cat: ''},
  // "monel-hardened boots": { id: 161881, prof: '', cat: ''},
  // "monel-hardened greaves": { id: 161884, prof: '', cat: ''},
  // "monel-hardened breastplate": { id: 161880, prof: '', cat: ''},
  // "monel-hardened pauldrons": { id: 161885, prof: '', cat: ''},
  // "monel-hardened armguards": { id: 161887, prof: '', cat: ''},
  // "monel-hardened waistguard": { id: 161886, prof: '', cat: ''},
  // "monel-hardened gauntlets": { id: 161882, prof: '', cat: ''},
  // "monel-hardened shanker": { id: 161916, prof: '', cat: ''},
  // "monel-hardened polearm": { id: 161917, prof: '', cat: ''},
  // "monel-hardened deckpounder": { id: 161915, prof: '', cat: ''},
  // "monel-hardened claymore": { id: 161914, prof: '', cat: ''},
  // "monel-hardened cutlass": { id: 152827, prof: '', cat: ''},
  // "monel-hardened shield": { id: 152818, prof: '', cat: ''},
  // "soul fibril": { id: 136689, prof: '', cat: ''},
  // "immaculate fibril": { id: 136691, prof: '', cat: ''},
  // "tailored skullblasters": { id: 144331, prof: '', cat: ''},
  // "rugged skullblasters": { id: 144332, prof: '', cat: ''},
  // "chain skullblasters": { id: 144333, prof: '', cat: ''},
  // "heavy skullblasters": { id: 144334, prof: '', cat: ''},
  // "semi-automagic cranial cannon": { id: 132504, prof: '', cat: ''},
  // "sawed-off cranial cannon": { id: 132505, prof: '', cat: ''},
  // "double-barreled cranial cannon": { id: 132506, prof: '', cat: ''},
  // "ironsight cranial cannon": { id: 132507, prof: '', cat: ''},
  // "shockinator": { id: 136688, prof: '', cat: ''},
  // "blink-trigger headgun": { id: 132500, prof: '', cat: ''},
  // "tactical headgun": { id: 132501, prof: '', cat: ''},
  // "bolt-action headgun": { id: 132502, prof: '', cat: ''},
  // "reinforced headgun": { id: 132503, prof: '', cat: ''},
  // "magnetic discombobulator": { id: 152830, prof: '', cat: ''},
  // "aqual mark": { id: 136692, prof: '', cat: ''},
  // "straszan mark": { id: 136693, prof: '', cat: ''},
  // "prophecy tarot": { id: 128978, prof: '', cat: ''},
  // "empyrial deep crown": { id: 151588, prof: '', cat: ''},
  // "empyrial elemental crown": { id: 151589, prof: '', cat: ''},
  // "empyrial cosmic crown": { id: 151587, prof: '', cat: ''},
  // "empyrial titan crown": { id: 151590, prof: '', cat: ''},
  // "righteous dawnlight medallion": { id: 130242, prof: '', cat: ''},
  // "ancient maelstrom amulet": { id: 130241, prof: '', cat: ''},
  // "blessed dawnlight medallion": { id: 130234, prof: '', cat: ''},
  // "intrepid necklace of prophecy": { id: 130240, prof: '', cat: ''},
  // "maelstrom band": { id: 130230, prof: '', cat: ''},
  // "shadowruby band": { id: 136713, prof: '', cat: ''},
  // "grim furystone gorget": { id: 130244, prof: '', cat: ''},
  // "raging furystone gorget": { id: 130243, prof: '', cat: ''},
  // "prophetic band": { id: 130229, prof: '', cat: ''},
  // "sylvan maelstrom amulet": { id: 130239, prof: '', cat: ''},
  // "dawnlight band": { id: 130231, prof: '', cat: ''},
  // "sorcerous shadowruby pendant": { id: 130233, prof: '', cat: ''},
  // "twisted pandemonite choker": { id: 130235, prof: '', cat: ''},
  // "subtle shadowruby pendant": { id: 130236, prof: '', cat: ''},
  // "tranquil necklace of prophecy": { id: 130237, prof: '', cat: ''},
  // "vindictive pandemonite choker": { id: 130238, prof: '', cat: ''},
  // "skystone pendant": { id: 130227, prof: '', cat: ''},
  // "deep amber pendant": { id: 130226, prof: '', cat: ''},
  // "azsunite pendant": { id: 130228, prof: '', cat: ''},
  // "azsunite loop": { id: 130225, prof: '', cat: ''},
  // "deep amber loop": { id: 130223, prof: '', cat: ''},
  // "skystone loop": { id: 130224, prof: '', cat: ''},
  // "royal quartz loop": { id: 153683, prof: '', cat: ''},
  // "owlseye loop": { id: 153685, prof: '', cat: ''},
  // "amberblaze loop": { id: 153686, prof: '', cat: ''},
  // "tidal amethyst loop": { id: 153684, prof: '', cat: ''},
  // "kubiline ring": { id: 153688, prof: '', cat: ''},
  // "golden beryl ring": { id: 153689, prof: '', cat: ''},
  // "kyanite ring": { id: 153687, prof: '', cat: ''},
  // "vigilance perch": { id: 146668, prof: '', cat: ''},
  // "fiendish shoulderguards": { id: 151577, prof: '', cat: ''},
  // "fiendish spaulders": { id: 151578, prof: '', cat: ''},
  // "dreadleather jerkin": { id: 128884, prof: '', cat: ''},
  // "dreadleather shoulderguard": { id: 128889, prof: '', cat: ''},
  // "dreadleather footpads": { id: 128885, prof: '', cat: ''},
  // "dreadleather gloves": { id: 128886, prof: '', cat: ''},
  // "dreadleather mask": { id: 128887, prof: '', cat: ''},
  // "dreadleather pants": { id: 128888, prof: '', cat: ''},
  // "dreadleather belt": { id: 128890, prof: '', cat: ''},
  // "dreadleather bindings": { id: 128891, prof: '', cat: ''},
  // "gravenscale spaulders": { id: 128905, prof: '', cat: ''},
  // "gravenscale warhelm": { id: 128903, prof: '', cat: ''},
  // "gravenscale girdle": { id: 128906, prof: '', cat: ''},
  // "gravenscale armbands": { id: 128907, prof: '', cat: ''},
  // "gravenscale leggings": { id: 128904, prof: '', cat: ''},
  // "gravenscale hauberk": { id: 128900, prof: '', cat: ''},
  // "gravenscale treads": { id: 128901, prof: '', cat: ''},
  // "gravenscale grips": { id: 128902, prof: '', cat: ''},
  // "warhide bindings": { id: 128883, prof: '', cat: ''},
  // "warhide gloves": { id: 128878, prof: '', cat: ''},
  // "warhide mask": { id: 128879, prof: '', cat: ''},
  // "warhide footpads": { id: 128877, prof: '', cat: ''},
  // "warhide shoulderguard": { id: 128881, prof: '', cat: ''},
  // "warhide pants": { id: 128880, prof: '', cat: ''},
  // "warhide belt": { id: 128882, prof: '', cat: ''},
  // "warhide jerkin": { id: 128876, prof: '', cat: ''},
  // "battlebound grips": { id: 128894, prof: '', cat: ''},
  // "battlebound armbands": { id: 128899, prof: '', cat: ''},
  // "battlebound treads": { id: 128893, prof: '', cat: ''},
  // "battlebound spaulders": { id: 128897, prof: '', cat: ''},
  // "battlebound girdle": { id: 128898, prof: '', cat: ''},
  // "battlebound leggings": { id: 128896, prof: '', cat: ''},
  // "battlebound warhelm": { id: 128895, prof: '', cat: ''},
  // "battlebound hauberk": { id: 128892, prof: '', cat: ''},
  // "lightweave breeches": { id: 151571, prof: '', cat: ''},
  // "imbued silkweave slippers": { id: 126996, prof: '', cat: ''},
  // "imbued silkweave pantaloons": { id: 126999, prof: '', cat: ''},
  // "imbued silkweave shade": { id: 127033, prof: '', cat: ''},
  // "imbued silkweave robe": { id: 126995, prof: '', cat: ''},
  // "imbued silkweave flourish": { id: 127034, prof: '', cat: ''},
  // "imbued silkweave gloves": { id: 126997, prof: '', cat: ''},
  // "imbued silkweave hood": { id: 126998, prof: '', cat: ''},
  // "imbued silkweave epaulets": { id: 127000, prof: '', cat: ''},
  // "imbued silkweave drape": { id: 127020, prof: '', cat: ''},
  // "imbued silkweave cinch": { id: 127001, prof: '', cat: ''},
  // "imbued silkweave bracers": { id: 127002, prof: '', cat: ''},
  // "imbued silkweave cover": { id: 127019, prof: '', cat: ''},
  // "silkweave slippers": { id: 126988, prof: '', cat: ''},
  // "silkweave pantaloons": { id: 126991, prof: '', cat: ''},
  // "silkweave shade": { id: 127031, prof: '', cat: ''},
  // "silkweave robe": { id: 126987, prof: '', cat: ''},
  // "silkweave flourish": { id: 127032, prof: '', cat: ''},
  // "silkweave gloves": { id: 126989, prof: '', cat: ''},
  // "silkweave hood": { id: 126990, prof: '', cat: ''},
  // "silkweave epaulets": { id: 126992, prof: '', cat: ''},
  // "silkweave drape": { id: 127017, prof: '', cat: ''},
  // "silkweave cinch": { id: 126993, prof: '', cat: ''},
  // "silkweave bracers": { id: 126994, prof: '', cat: ''},
  // "silkweave cover": { id: 127016, prof: '', cat: ''},
  // "bear tartare": { id: 133576, prof: '', cat: ''},
  // "deep-fried mossgill": { id: 133561, prof: '', cat: ''},
  // "dried mackerel strips": { id: 133575, prof: '', cat: ''},
  // "faronaar fizz": { id: 133563, prof: '', cat: ''},
  // "fighter chow": { id: 133577, prof: '', cat: ''},
  // "pickled stormray": { id: 133562, prof: '', cat: ''},
  // "salt and pepper shank": { id: 133557, prof: '', cat: ''},
  // "spiced rib roast": { id: 133564, prof: '', cat: ''},
  // "suramar surf and turf": { id: 133566, prof: '', cat: ''},
  // "koi-scented stormray": { id: 133568, prof: '', cat: ''},
  // "barracuda mrglgagh": { id: 133567, prof: '', cat: ''},
  // "leybeque ribs": { id: 133565, prof: '', cat: ''},
  // "drogbar-style salmon": { id: 133569, prof: '', cat: ''},
  // "azshari salad": { id: 133571, prof: '', cat: ''},
  // "seed-battered fish plate": { id: 133573, prof: '', cat: ''},
  // "nightborn delicacy platter": { id: 133572, prof: '', cat: ''},
  // "the hungry magister": { id: 133570, prof: '', cat: ''},
  // "fishbrul special": { id: 133574, prof: '', cat: ''},
  // "crispy bacon": { id: 133681, prof: '', cat: ''},
  // "hearty feast": { id: 133578, prof: '', cat: ''},
  // "spiced falcosaur omelet": { id: 142334, prof: '', cat: ''},
  // "slice of bacon": { id: 133680, prof: '', cat: ''},
  // "wildfowl egg": { id: 124121, prof: '', cat: ''},
  // "leyblood": { id: 124120, prof: '', cat: ''},
  // "big gamy ribs": { id: 124119, prof: '', cat: ''},
  // "fatty bearsteak": { id: 124118, prof: '', cat: ''},
  // "lean shank": { id: 124117, prof: '', cat: ''},
  // "mossgill perch": { id: 124108, prof: '', cat: ''},
  // "highmountain salmon": { id: 124109, prof: '', cat: ''},
  // "stormray": { id: 124110, prof: '', cat: ''},
  // "runescale koi": { id: 124111, prof: '', cat: ''},
  // "black barracuda": { id: 124112, prof: '', cat: ''},
  // "cursed queenfish": { id: 124107, prof: '', cat: ''},
  // "silver mackerel": { id: 133607, prof: '', cat: ''},
  // "leyscale koi": { id: 143748, prof: '', cat: ''},
  // "silkweave splint": { id: 133942, prof: '', cat: ''},
  // "silkweave bandage": { id: 133940, prof: '', cat: ''},
  // "embersilk cloth":{ id:  53010, prof: '', cat: ''},
  // "roseate pigment": { id: 129032, prof: '', cat: ''},
  // "sallow pigment": { id: 129034, prof: '', cat: ''},
  // "cerulean pigment": { id: 114931, prof: '', cat: ''},
  // "chaos crystal": { id: 124442, prof: '', cat: ''},
  // "leylight shard": { id: 124441, prof: '', cat: ''},
  // "arkhana": { id: 124440, prof: '', cat: ''},
  // "luminous shard": { id: 111245, prof: '', cat: ''},
  // "fiendish leather": { id: 151566, prof: '', cat: ''},
  // "raw beast hide": { id: 110609, prof: '', cat: ''},
  // "stormscale": { id: 124115, prof: '', cat: ''},
  // "unbroken claw": { id: 124438, prof: '', cat: ''},
  // "stonehide leather": { id: 124113, prof: '', cat: ''},
  // "unbroken tooth": { id: 124439, prof: '', cat: ''},
  // "quick dawnlight": { id: 130220, prof: '', cat: ''},
  // "deadly deep chemirine": { id: 151580, prof: '', cat: ''},
  // "quick lightsphene": { id: 151583, prof: '', cat: ''},
  // "masterful argulite": { id: 151584, prof: '', cat: ''},
  // "versatile labradorite": { id: 151585, prof: '', cat: ''},
  // "versatile maelstrom sapphire": { id: 130221, prof: '', cat: ''},
  // "masterful shadowruby": { id: 130222, prof: '', cat: ''},
  // "deadly eye of prophecy": { id: 130219, prof: '', cat: ''},
  // "insightful rubellite": { id: 153714, prof: '', cat: ''},
  // "straddling viridium": { id: 153715, prof: '', cat: ''},
  // "deadly deep amber": { id: 130215, prof: '', cat: ''},
  // "quick azsunite": { id: 130216, prof: '', cat: ''},
  // "versatile skystone": { id: 130217, prof: '', cat: ''},
  // "chemirine": { id: 151720, prof: '', cat: ''},
  // "hesselian": { id: 151721, prof: '', cat: ''},
  // "florid malachite": { id: 151722, prof: '', cat: ''},
  // "lightsphene": { id: 151719, prof: '', cat: ''},
  // "dawnlight": { id: 130180, prof: '', cat: ''},
  // "furystone": { id: 130178, prof: '', cat: ''},
  // "pandemonite": { id: 130181, prof: '', cat: ''},
  // "maelstrom sapphire": { id: 130182, prof: '', cat: ''},
  // "shadowruby": { id: 130183, prof: '', cat: ''},
  // "felhide": { id: 124116, prof: '', cat: ''},
  // "argulite": { id: 151718, prof: '', cat: ''},
  // "nethershard essence": { id: 146659, prof: '', cat: ''},
  // "labradorite": { id: 151579, prof: '', cat: ''},
  // "auto-hammer": { id: 132514, prof: '', cat: ''},
  // "failure detection pylon": { id: 132515, prof: '', cat: ''},
  // "reaves battery": { id: 132523, prof: '', cat: ''},
  // "foxflower flux": { id: 124436, prof: '', cat: ''},
  // "chaotic spinel": { id: 130175, prof: '', cat: ''},
  // "sangrite": { id: 130172, prof: '', cat: ''},
  // "falcosaur egg": { id: 142336, prof: '', cat: ''},
  // "sharp spritethorn": { id: 127681, prof: '', cat: ''},
  // "pristine falcosaur feather": { id: 142335, prof: '', cat: ''},
  // "lightweave cloth": { id: 151567, prof: '', cat: ''},
  // "rich illusion dust": { id: 156930, prof: '', cat: ''},
  // "runic catgut": { id: 127037, prof: '', cat: ''},
  // "heated hard leystone bar": { id: 124395, prof: '', cat: ''},
  // "heated leystone bar": { id: 128777, prof: '', cat: ''},
  // "leystone bar": { id: 124007, prof: '', cat: ''},
  // "leystone shard": { id: 124420, prof: '', cat: ''},
  // "heated hard leystone ingot": { id: 124423, prof: '', cat: ''},
  // "hard leystone ingot": { id: 124422, prof: '', cat: ''},
  // "red-hot leystone bar": { id: 124426, prof: '', cat: ''},
  // "gem chip": { id: 130203, prof: '', cat: ''},
  // "tanned stonehide leather": { id: 136539, prof: '', cat: ''},
  // "stonehide leather lining": { id: 130872, prof: '', cat: ''},
  // "shaved stonehide pelt": { id: 130869, prof: '', cat: ''},
  // "fresh stonehide pelt": { id: 130868, prof: '', cat: ''},
  // "the sentinel's eternal refuge": { id: 146669, prof: '', cat: ''},
  // "celumbra, the night's dichotomy": { id: 146666, prof: '', cat: ''},
  // "saber's eye of agility": { id: 130247, prof: '', cat: ''},
  // "masterful queen's opal": { id: 130218, prof: '', cat: ''},
  // "enchanter's umbral wand": { id: 161925, prof: '', cat: ''},
  // "saber''s eye": { id: 130245, prof: '', cat: ''},
  // "saber's eye of strength": { id: 130246, prof: '', cat: ''},
  // "shal'dorei silk": { id: 124437, prof: '', cat: ''},
  // "queen's opal pendant": { id: 136712, prof: '', cat: ''},
  // "saber's eye of intellect": { id: 130248, prof: '', cat: ''},  
}
