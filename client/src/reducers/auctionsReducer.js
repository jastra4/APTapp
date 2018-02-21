const auctionsReducerDefaultState = [];

const auctionsReducer = (state = auctionsReducerDefaultState, action) => {
	switch (action.type) {
		case 'AUCTION_DATA':
			return [...state, action.auctions];
		case 'DELETE_DATA':
			return {};
		default:
			return state;
	}
};