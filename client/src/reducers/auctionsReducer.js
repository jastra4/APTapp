const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ITEM_LIST':
      return action.payload;
    	// const newItem = action.payload[0].item;
     //  return [...state,{
     //  	[action.payload[0].item]: action.payload,
     //  }];
    default:
      return state;
  }
};

export default itemsReducer;

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
