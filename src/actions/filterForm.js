import * as actionTypes from './types';

export const searchTVShow = (value) => {
  return { type: actionTypes.SEARCH_VALUE, value };
};

export const clearSearchField = () => {
  return { type: actionTypes.CLEAR_SEARCH };
};
