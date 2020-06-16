import {
  CREATE_NEW_USER,
  LOGOUT,
  GET_USER_DETAILS,
  SET_USER_AUTH,
  ADD_SHOW_TO_USER_LIST,
  GET_USER_SHOWS,
  DELETE_SHOW_FROM_USER_LIST,
} from './types';

import history from '../helpers/history';
import AuthService from '../authService';
import ApiService from '../api/apiService';

export const setUserAuthentication = () => {
  const isAuthenticated = AuthService.isAuthenticated();
  return { type: SET_USER_AUTH, isAuthenticated };
};

export const createUser = (user) => async (dispatch) => {
  const response = await ApiService.createNewUser(user);
  let isSignupSucceeded;
  if (!response.data) {
    isSignupSucceeded = false;
  } else {
    AuthService.setToken(response.data.token);
    isSignupSucceeded = true;
    setTimeout(() => {
      dispatch(setUserAuthentication());
      history.push('/');
    }, 2000);
  }
  dispatch({ type: CREATE_NEW_USER, isSignupSucceeded });
};

export const LoginUser = (user) => async (dispatch) => {
  const response = await AuthService.login(user);
  AuthService.setToken(response.data.token);
  dispatch(setUserAuthentication());
  dispatch(getUserTVShows());
  history.goBack();
};

export const logoutUser = () => {
  AuthService.logout();
  history.push('/');
  return { type: LOGOUT };
};

export const getUserDetails = () => async (dispatch) => {
  const response = await AuthService.fetchUser();
  dispatch({ type: GET_USER_DETAILS, userDetails: response.data });
};

export const addTVShowToUserTVShows = (id) => async (dispatch) => {
  const response = await ApiService.addTVShowToUserTVShows(id);
  dispatch({ type: ADD_SHOW_TO_USER_LIST, tvShowId: response.data });
};

export const removeTVShowFromUserTVShows = (tvShowId) => async (dispatch) => {
  await ApiService.removeTVShowFromUserTVShows(tvShowId);
  dispatch({ type: DELETE_SHOW_FROM_USER_LIST, tvShowId });
};

export const getUserTVShows = () => async (dispatch) => {
  const response = await ApiService.getUserTVShows();
  dispatch({ type: GET_USER_SHOWS, userTVShows: response.data });
};
