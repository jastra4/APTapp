const defaultState = { status: false, message: '' };

export const loadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOADING':
      return (
          action.payload
      );
    default:
      return state;
  }
};
