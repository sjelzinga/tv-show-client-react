import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
  searchValue: '',
  hasSearchValue: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_VALUE:
      return {
        searchValue: action.value,
        hasSearchValue: true,
      };
    case actionTypes.CLEAR_SEARCH:
      return { searchValue: '', hasSearchValue: false };
    default:
      return state;
  }
};
