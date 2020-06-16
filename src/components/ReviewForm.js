import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "./styledComponents/Button";
import StarRating from "./styledComponents/StarRating";
import "./ReviewForm.css";
import ApiService from "../api/apiService";
import { postReview } from "../actions";

class ReviewForm extends Component {
  state = {
    rating: 0,
    review: "",
    isSubmitted: false
  };

  resetSubmit = () => {
    this.setState({
      isSubmitted: false
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  setStarRating = rating => {
    this.setState({
      rating
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    if (this.state.rating !== 0) {
      const review = {
        rating: parseInt(this.state.rating),
        comment: this.state.review,
        showId: this.props.selectedShow._id
      };
      const response = await this.props.postReview(review);
      if (response.status === 201) {
        ApiService.addUserRatingToTVShow(
          this.props.selectedShow._id,
          response.data._id,
          this.state.rating
        );
        this.setState({
          rating: 0,
          review: "",
          isSubmitted: true
        });
        this.props.onSubmit();
      }
    }
  };

  render() {
    return (
      <div className="review-form-wrapper">
        <h3>Write a review</h3>
        <form onSubmit={this.onSubmit}>
          <div className="review-form--rating">
            <label>My rating:</label>
            <StarRating
              setStarRating={this.setStarRating}
              isSubmitted={this.state.isSubmitted}
              clearSubmit={this.resetSubmit}
            />
          </div>
          <textarea
            value={this.state.review}
            onChange={this.onChange}
            name="review"
          />
          <div className="review-btn-wrapper">
            <Button style={{ width: "9rem" }} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedShow: state.shows.selectedShow
  };
}

export default connect(
  mapStateToProps,
  { postReview }
)(ReviewForm);
