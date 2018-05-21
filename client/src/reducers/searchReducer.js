const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'ITEM_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
