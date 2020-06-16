import * as actionTypes from './types';
import ApiService from '../api/apiService';

export const fetchReviews = (showId) => async (dispatch) => {
  const response = await ApiService.fetchReviews(showId);
  dispatch({ type: actionTypes.FETCH_REVIEWS, reviews: response.data });
};

export const postReview = (review) => async (dispatch) => {
  const response = await ApiService.postReview(review);
  dispatch({ type: actionTypes.POST_REVIEW, review: response.data });
  return response;
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await ApiService.deleteReview(reviewId);
  console.log(response);
  dispatch({ type: actionTypes.DELETE_REVIEW, reviewId: reviewId });
};

export const getReviewsFromStore = () => {
  return { type: actionTypes.GET_REVIEWS };
};
