import { createStore } from 'redux';
import rootReducer from '../../src/reducers/rootReducer';
// import items from '../../src/data/items.js';
// import auctionsReducer from '../../src/reducers/auctionsReducer';

// const defaultState = {  
// 	items
// }

const Store = createStore(rootReducer);

export default Store;
