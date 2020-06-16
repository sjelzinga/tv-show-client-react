import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Review from './Review';
import './Reviews.css';
import { fetchReviews } from '../actions';

class Reviews extends Component {
  componentDidMount() {
    this.props.fetchReviews(this.props.tvShowId);
  }

  renderReviews() {
    return _.reverse(this.props.reviews).map((review) => {
      return (
        <div key={review._id}>
          <Review
            id={review._id}
            rating={review.rating}
            userId={review.user}
            username={review.username}
            review={review.comment}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="list-reviews-wrapper">
        <h2>Reviews</h2>
        {this.renderReviews()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reviews: state.reviews.reviews,
  };
}

export default connect(mapStateToProps, { fetchReviews })(Reviews);
