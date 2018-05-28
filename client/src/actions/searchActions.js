export const loadResults = (items) => ({
  type: 'ITEM_LIST',
  payload: items,
});

export const clearSearchResults = () => ({
  type: 'CLEAR',
});
