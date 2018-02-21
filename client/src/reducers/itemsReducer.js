const itemsReducerDefaultState = [];

const itemsReducer = (state = itemsReducerDefaultState, action) => {
	switch (action.type) {
		case 'ITEM_DATA':
			return [...state, action.items];
		case 'DELETE_DATA':
			return {};
		default:
			return state;
	}
};