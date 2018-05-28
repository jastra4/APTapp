const defaultState = [];

export const summaryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE':
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
