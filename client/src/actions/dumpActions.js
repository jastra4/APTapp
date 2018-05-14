export const setDumpTotals = (dumpTotals) => ({
   type: 'DUMP',
   payload: dumpTotals,
});

export const clearDumpTotals = (dumpTotals) => ({
    type: 'CLEAR',
    payload: dumpTotals,
});

// export const loadingStatus = (status) => ({
//     type: 'LOADING',
//     payload: status,
// });

// export default setDumpTotals;
