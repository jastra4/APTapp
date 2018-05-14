const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ITEM_LIST':
      return action.payload;
    // case 'LOADING':
    //   console.log('LOADING true');
    //   return (
    //     action.payload
    //   );
    default:
      return state;
  }
};

export default itemsReducer;
