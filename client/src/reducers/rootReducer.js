import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import dumpsReducer from './dumpsReducer';

const rootReducer = combineReducers({
	items: itemsReducer,
	dumps: dumpsReducer,
});

export default rootReducer;
