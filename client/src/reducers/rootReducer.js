import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import summaryReducer from './dumpsReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
	items: itemsReducer, // results
	dailySummaries: summaryReducer,
	loading: loadingReducer,
});

export default rootReducer;
