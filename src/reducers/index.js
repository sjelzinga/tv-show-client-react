import { combineReducers } from 'redux';
import showsReducer from './showsReducer';
import formReducer from './formReducer';
import reviewsReducer from './reviewsReducer';
import userReducer from './userReducer';

export default combineReducers({
  shows: showsReducer,
  search: formReducer,
  reviews: reviewsReducer,
  user: userReducer,
});
