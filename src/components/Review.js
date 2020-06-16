import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteReview, getUserDetails } from '../actions';
import ApiService from '../api/apiService';
import './Review.css';

class Review extends Component {
  componentDidMount() {
    this.props.getUserDetails();
  }
  deleteReview(reviewId) {
    this.props.deleteReview(reviewId);
    ApiService.deleteUserRatingFromTVShow(this.props.currentShowId, reviewId);
  }

  renderUserReviewButtons(userId, reviewId) {
    // Buttons to edit or delete a review
    if (userId === this.props.currentUserId) {
      return (
        <div className="review-buttons">
          <i className="icon ion-md-create" />
          <i
            className="icon ion-md-trash"
            onClick={() => this.deleteReview(reviewId)}
          />
        </div>
      );
    }
  }

  render() {
    const { rating, username, userId, review, id } = this.props.review;
    return (
      <div className="review-container">
        <div className="review-header-wrapper">
          <span className="review-header">
            {rating}
            <i className="star icon ion-md-star" />
            <span className="review-username">{username}</span>
          </span>
          {this.renderUserReviewButtons(userId, id)}
        </div>
        <div className="review-text">{review}</div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    review: ownProps,
    currentUserId: state.user.user._id,
    currentShowId: state.shows.selectedShow._id,
  };
}

export default connect(mapStateToProps, { deleteReview, getUserDetails })(
  Review
);
