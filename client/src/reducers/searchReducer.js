export const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'ITEM_LIST':
      return action.payload;
    case 'CLEAR':
      return ([]);
    default:
      return state;
  }
};
