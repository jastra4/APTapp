const defaultState = [];

const dumpsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'DUMP':
      return (
      	[...state,
      	action.payload]
      );
    default:
      return state;
  }
};

export default dumpsReducer;
