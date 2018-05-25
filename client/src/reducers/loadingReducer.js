export const loadingReducer = (state = { status: false, message: '' }, action) => {
  switch (action.type) {
    case 'LOADING':
      return (
          action.payload
      );
    default:
      return state;
  }
};
