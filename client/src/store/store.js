import { createStore } from 'redux';
import { rootReducer } from '../../src/reducers/rootReducer';

const Store = createStore(rootReducer);

export default Store;
