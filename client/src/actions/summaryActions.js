export const updateMarketSummary = (dailySummary) => ({
    type: 'UPDATE',
    payload: dailySummary,
});

export const clearMarketSummary = () => ({
    type: 'CLEAR',
});
