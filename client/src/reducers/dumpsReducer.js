const defaultState = [];

const dumpsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'DUMP':
      return (
      	[...state,
      	action.payload]
      );
    case 'CLEAR':
      console.log('CLEAR reducer ran ', action.payload);
      return (
        [action.payload]
      );
    default:
      return state;
  }
};

export default dumpsReducer;

// updated by Item.js
// new searches are adding state on top of old state from previous searches
// this is messing up the market summary component
// state from old searches should be cleared out when a new one is run