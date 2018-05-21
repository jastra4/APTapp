import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import dumpsReducer from './dumpsReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
	items: itemsReducer, // results
	dumps: dumpsReducer, // summaries
	loading: loadingReducer, // status
});

export default rootReducer;
