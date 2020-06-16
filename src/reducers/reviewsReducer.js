import {
  FETCH_REVIEWS,
  POST_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW
} from "../actions/types";

const INITIAL_STATE = {
  reviews: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_REVIEWS:
      return { ...state, reviews: action.reviews };
    case POST_REVIEW:
      return { ...state, reviews: [...state.reviews, action.review] };
    case GET_REVIEWS:
      return { ...state };
    case DELETE_REVIEW:
      const reviews = filterReviews(state.reviews, action.reviewId);
      return { ...state, reviews };
    default:
      return state;
  }
};

const filterReviews = (reviews, reviewId) => {
  return reviews.filter(review => review._id !== reviewId);
};
