
// update dailySummaries
export const updateMarketSummary = (dailySummary) => ({
    type: 'UPDATE',
    payload: dailySummary,
});

// clear dailySummaries
export const clearMarketSummary = () => ({
    type: 'CLEAR',
});
