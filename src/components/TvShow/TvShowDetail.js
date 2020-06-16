import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchSelectedShow,
  getReviewsFromStore,
  clearSelectedShow
} from "../../actions";

import Reviews from "../Reviews";
import ReviewForm from "../ReviewForm";
import "./TvShowDetail.css";

export class TvShowDetail extends Component {
  componentDidMount() {
    this.props.fetchSelectedShow(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearSelectedShow();
  }

  getReviews = () => {
    this.props.getReviewsFromStore();
  };

  render() {
    // console.log(this.props.show);
    if (!this.props.show) {
      return <div>Loading....</div>;
    }
    const { poster, title, year } = this.props.show;
    return (
      <React.Fragment>
        <div className="tv-show-detail-wrapper">
          <div className="tv-show-poster">
            <img src={poster} alt="title" />
          </div>
          <div className="tv-show-info">
            <h1>
              <span>
                {title} ({year})
              </span>
            </h1>
          </div>
        </div>
        {this.props.user.isAuthenticated && (
          <ReviewForm onSubmit={this.getReviews} />
        )}
        <Reviews tvShowId={this.props.show._id} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    show: state.shows.selectedShow,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchSelectedShow, getReviewsFromStore, clearSelectedShow }
)(TvShowDetail);
