import store from '../store';
import axios from 'axios';

export const someAction = (data) => {
  console.log('someAction called');
  store.dispatch({
    type: 'SOME_ACTION',
    payload: data
  });
};

export const otherAction = () => {
  console.log('otherAction called');
  store.dispatch({
    type: 'OTHER_ACTION'
  });
};
