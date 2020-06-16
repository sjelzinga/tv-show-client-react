import {
  FETCH_SHOWS,
  FETCH_SHOW,
  CLEAR_SELECTED_SHOW,
  FILTER_SHOWS,
} from '../actions/types';

const INITIAL_STATE = {
  allShows: [],
  filteredShows: [],
  showNotFound: false,
  selectedShow: null,
};

const fetchTVShows = (state, action) => {
  return { ...state, allShows: action.shows };
};

const fetchTVShow = (state, action) => {
  return { ...state, selectedShow: action.show };
};

const clearSelectedTVShow = (state, action) => {
  return { ...state, selectedShow: null };
};

const filterTVShows = (state, action) => {
  const { detail, searchValue } = action.searchObj;
  if (searchValue === 'all') return { ...state, filteredShows: [] };

  const filteredShows = state.allShows.filter(
    (show) => show[detail].toLowerCase().indexOf(searchValue) !== -1
  );

  if (filteredShows.length === 0) return { ...state, showNotFound: true };

  return { ...state, filteredShows, showNotFound: false };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SHOWS:
      return fetchTVShows(state, action);
    case FETCH_SHOW:
      return fetchTVShow(state, action);
    case CLEAR_SELECTED_SHOW:
      return clearSelectedTVShow(state);
    case FILTER_SHOWS:
      return filterTVShows(state, action);
    default:
      return state;
  }
};
