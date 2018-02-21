const itemsReducer = (state = items, action) => {
  switch (action.type) {
    case 'ITEM_LIST':
      return [...state,{
        newList: action.payload,
      }];
    default:
      return state;
  }
};

export default itemsReducer;

const items = [
	[{
    "auc":"0",
    "bid": "99",
    "buyout": "100",
    "context": "0",
    "item": "1",
    "owner": "player1",
    "ownerRealm": "testrealm",
    "quantity": "10",
    "rand": "0",
    "seed": "0",
    "timeLeft": "LONG"
  }]
];
