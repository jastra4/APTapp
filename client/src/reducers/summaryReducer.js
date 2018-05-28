export const summaryReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE':
      console.log('summaryReducer updated');
    
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
