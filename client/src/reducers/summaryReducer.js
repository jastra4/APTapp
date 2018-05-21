export const summaryReducer = (state = [], action) => {
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
