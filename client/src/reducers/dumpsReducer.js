const defaultState = [];

const dumpsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'DUMP':
      return (
      	[...state,
      	action.payload]
      );
    case 'CLEAR':
      return ([]);
    default:
      return state;
  }
};

export default dumpsReducer;
