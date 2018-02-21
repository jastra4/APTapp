import { combineReducers } from 'redux';
import itemsReducer from './auctionsReducer';

const rootReducer = combineReducers({ items: itemsReducer });

export default rootReducer;
