import { combineReducers } from 'redux';
import auctionsReducer from './auctionsReducer';

const rootReducer = combineReducers({ auctionsReducer });

export default rootReducer;