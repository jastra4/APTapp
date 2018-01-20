const auctionsReducer = (state = [], action) => {
  if (action.type === 'SOME_ACTION') {
    return action.payload;
  } else if (action.type === 'OTHER_ACTION') {
    return [];
  }
  return state;
};

export default auctionsReducer;