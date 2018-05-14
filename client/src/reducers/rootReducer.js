import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import dumpsReducer from './dumpsReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
	items: itemsReducer,
	dumps: dumpsReducer,
	loading: loadingReducer,
});

export default rootReducer;
