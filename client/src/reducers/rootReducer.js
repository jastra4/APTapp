import { combineReducers } from 'redux';
import { searchReducer } from './searchReducer';
import { summaryReducer } from './summaryReducer';
import { loadingReducer } from './loadingReducer';

export const rootReducer = combineReducers({
	searchResults: searchReducer,
	dailySummaries: summaryReducer,
	loading: loadingReducer,
});
