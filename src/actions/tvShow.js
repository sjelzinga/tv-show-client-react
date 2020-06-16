import * as actionTypes from "./types";
import ApiService from "../api/apiService";

export const fetchShows = () => async dispatch => {
  const responseShows = await ApiService.fetchTVShows();
  dispatch({
    type: actionTypes.FETCH_SHOWS,
    shows: responseShows.data
  });
};

export const fetchSelectedShow = showId => async dispatch => {
  const response = await ApiService.fetchTVShow(showId);
  dispatch({ type: actionTypes.FETCH_SHOW, show: response.data });
};

export const clearSelectedShow = () => {
  return { type: actionTypes.CLEAR_SELECTED_SHOW };
};

export const filterShows = searchObj => {
  return { type: actionTypes.FILTER_SHOWS, searchObj: searchObj };
};

export const clearFilterShows = () => {
  return { type: actionTypes.CLEAR_FILTER_SHOWS };
};
