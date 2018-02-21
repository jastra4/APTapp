import { combineReducers } from 'redux';
import auctionsReducer from './auctionsReducer';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({ auctionsReducer, itemsReducer });

export default rootReducer;
