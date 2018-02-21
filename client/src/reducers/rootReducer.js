import { combineReducers } from 'redux';
import itemsReducer from './auctionsReducer';
//import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({ itemsReducer });

export default rootReducer;
