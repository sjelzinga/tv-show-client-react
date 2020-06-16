import {
  CREATE_NEW_USER,
  GET_USER_DETAILS,
  LOGOUT,
  SET_USER_AUTH,
  GET_USER_SHOWS,
  ADD_SHOW_TO_USER_LIST,
  DELETE_SHOW_FROM_USER_LIST
} from "../actions/types";

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false,
  userShows: [],
  isSignupSucceeded: null
};

const getUserDetails = (state, action) => {
  return state.isAuthenticated ? { ...state, user: action.userDetails } : state;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_NEW_USER:
      return { ...state, isSignupSucceeded: action.isSignupSucceeded };

    case SET_USER_AUTH:
      return { ...state, isAuthenticated: action.isAuthenticated };

    case GET_USER_DETAILS:
      return getUserDetails(state, action);

    case GET_USER_SHOWS:
      return { ...state, userShows: action.userTVShows };

    case ADD_SHOW_TO_USER_LIST:
      return {
        ...state,
        userShows: addItemToArray(state.userShows, action.tvShowId)
      };

    case DELETE_SHOW_FROM_USER_LIST:
      const userShows = deleteItemFromArrayById(
        state.userShows,
        action.tvShowId
      );
      return { ...state, userShows };

    case LOGOUT:
      return { ...state, user: {}, isAuthenticated: false, userShows: [] };

    default:
      return state;
  }
};

const deleteItemFromArrayById = (array, itemId) => {
  return array.filter(val => val._id !== itemId);
};

const addItemToArray = (array, item) => {
  return [...array, item];
};
