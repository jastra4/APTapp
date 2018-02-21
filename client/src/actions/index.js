import store from '../store';
import axios from 'axios';

// GET_ALL_DATA
export const getAllData = (item) => {
  axios('/itemAllData')
  .then(res => {
    store.dispatch({
      type: 'ITEM_DATA',
      payload: res.data.results.items
    });
    store.dispatch({
      type: 'AUCTION_DATA',
      payload: res.data.results.auctions
    })
  });
};

// ADD_ITEM
// export const addItem = (data) => {
//   store.dispatch({
//     type: 'ADD_ITEM',
//     payload: data
//   });
// };

// REMOVE_ITEM
// export const removeItem = () => {
//   store.dispatch({
//     type: 'REMOVE_ITEM'
//   });
// };