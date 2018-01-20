import { createStore } from 'redux';
import reducer from './src/reducers/index';
import items from './src/data/items.js';
import auctionsReducer from './src/reducers/auctionsReducer';

// create an object for the defaut data, this is an ES6 object
const defaultState = {  
	items
}

const store = createStore(auctionsReducer, defaultState);

export default store;