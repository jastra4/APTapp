const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOADING':
      console.log('LOADING true');
      return (
          action.payload
      );
    default:
      return state;
  }
};

export default loadingReducer;