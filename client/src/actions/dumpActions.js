
// update dailySummaries
export const updateMarketSummary = (dailySummary) => ({
    type: 'UPDATE',
    payload: dailySummary,
});

// clear dailySummaries
export const clearDumpTotals = (dumpTotals) => ({
    type: 'CLEAR',
    payload: dumpTotals,
});
