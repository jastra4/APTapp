const itemsReducer = (state = [{results: []}], action) => { // make state default {}
  switch (action.type) {
    case 'ITEM_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default itemsReducer;

// { dump: { results: [ [] ] } }

// [
//   {results: [{}, {}, {}]}, 
//   {results: [{}, {}, {}]}, 
//   {results: [{}, {}, {}]},
// ]

// Example itemsReducer:
// const itemInStore = [
// 	{ itemId1: [
// 			{
// 		    "auc":"0",
// 		    "bid": "99",
// 		    "buyout": "100",
// 		    "context": "0",
// 		    "item": "1",
// 		    "owner": "player1",
// 		    "ownerRealm": "testrealm",
// 		    "quantity": "10",
// 		    "rand": "0",
// 		    "seed": "0",
// 		    "timeLeft": "LONG",			
// 			},
// 			{
// 				"auc":"0",
// 	      "bid": "99",
// 	      "buyout": "100",
// 	      "context": "0",
// 	      "item": "2",
// 	      "owner": "player1",
// 	      "ownerRealm": "testrealm",
// 	      "quantity": "20",
// 	      "rand": "0",
// 	      "seed": "0",
// 	      "timeLeft": "LONG",
//       },
// 			{
// 				"auc":"0",
// 	      "bid": "99",
// 	      "buyout": "100",
// 	      "context": "0",
// 	      "item": "3",
// 	      "owner": "player3",
// 	      "ownerRealm": "testrealm",
// 	      "quantity": "30",
// 	      "rand": "0",
// 	      "seed": "0",
// 	      "timeLeft": "LONG",
// 			},
// 		]
// 	},
// 	{ itemId2: [
// 			{
// 		    "auc":"0",
// 		    "bid": "99",
// 		    "buyout": "100",
// 		    "context": "0",
// 		    "item": "1",
// 		    "owner": "player1",
// 		    "ownerRealm": "testrealm",
// 		    "quantity": "10",
// 		    "rand": "0",
// 		    "seed": "0",
// 		    "timeLeft": "LONG",			
// 			},
// 			{
// 				"auc":"0",
// 	      "bid": "99",
// 	      "buyout": "100",
// 	      "context": "0",
// 	      "item": "2",
// 	      "owner": "player1",
// 	      "ownerRealm": "testrealm",
// 	      "quantity": "20",
// 	      "rand": "0",
// 	      "seed": "0",
// 	      "timeLeft": "LONG",
//       },
// 			{
// 				"auc":"0",
// 	      "bid": "99",
// 	      "buyout": "100",
// 	      "context": "0",
// 	      "item": "3",
// 	      "owner": "player3",
// 	      "ownerRealm": "testrealm",
// 	      "quantity": "30",
// 	      "rand": "0",
// 	      "seed": "0",
// 	      "timeLeft": "LONG",
// 			},
// 		]
// 	},
// 	{ itemId3: [
// 			{
// 		    "auc":"0",
// 		    "bid": "99",
// 		    "buyout": "100",
// 		    "context": "0",
// 		    "item": "1",
// 		    "owner": "player1",
// 		    "ownerRealm": "testrealm",
// 		    "quantity": "10",
// 		    "rand": "0",
// 		    "seed": "0",
// 		    "timeLeft": "LONG",			
// 			},
// 			{
// 				"auc":"0",
// 	      "bid": "99",
// 	      "buyout": "100",
// 	      "context": "0",
// 	      "item": "2",
// 	      "owner": "player1",
// 	      "ownerRealm": "testrealm",
// 	      "quantity": "20",
// 	      "rand": "0",
// 	      "seed": "0",
// 	      "timeLeft": "LONG",
//       },
// 			{
// 				"auc":"0",
// 	      "bid": "99",
// 	      "buyout": "100",
// 	      "context": "0",
// 	      "item": "3",
// 	      "owner": "player3",
// 	      "ownerRealm": "testrealm",
// 	      "quantity": "30",
// 	      "rand": "0",
// 	      "seed": "0",
// 	      "timeLeft": "LONG",
// 			},
// 		]
// 	},
// ];
