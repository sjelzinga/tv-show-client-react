import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  addTVShowToUserTVShows,
  removeTVShowFromUserTVShows,
} from '../../actions';
import AddDeleteButton from '../styledComponents/AddDeleteButton';
import ToolTip from '../styledComponents/ToolTip';
import './TvShowCard.css';

class TvShowCard extends Component {
  state = {
    avgRating: 0,
  };

  componentDidMount() {
    this.calculateAvgRating();
  }

  componentDidUpdate(prevState) {
    if (!_.isEqual(prevState.ratings, this.props.showDetails.ratings)) {
      this.calculateAvgRating();
    }
  }

  calculateAvgRating() {
    if (this.props.showDetails.ratings.length !== 0) {
      const total = this.props.showDetails.ratings.reduce((acc, curr) => ({
        rating: acc.rating + curr.rating,
      }));
      const avgRating = (total.rating / this.props.showDetails.ratings.length)
        .toFixed(1)
        .replace('.0', '');
      this.setState({
        avgRating,
      });
    } else {
      this.setState({
        avgRating: 0,
      });
    }
  }

  addToUserList = (id) => {
    this.props.addTVShowToUserTVShows(id);
  };

  removeFromUserList = (id) => {
    this.props.removeTVShowFromUserTVShows(id);
  };

  isShowAddedToList = (id) => {
    if (this.props.userShows) {
      const bools = this.props.userShows.findIndex((show) => show._id === id);
      return bools > -1 ? true : false;
    }
  };

  renderAdminBtns = (id) => {
    if (this.props.isAuthenticated) {
      const isAdded = this.isShowAddedToList(id);
      return (
        <div className="tooltip-parent card-btn">
          <AddDeleteButton
            showId={id}
            addMethod={this.addToUserList}
            deleteMethod={this.removeFromUserList}
            isAdded={isAdded}
          />
          <ToolTip text={isAdded ? 'Delete from list' : 'Add to list'} />
        </div>
      );
    }
  };

  displayRating = () => {
    return (
      <React.Fragment>
        {this.state.avgRating === 0 ? (
          <div className="no-rating">No rating</div>
        ) : (
          <React.Fragment>
            <div className="rating">{this.state.avgRating}</div>
            <div className="rating-outof">/5</div>
            <i className="star icon ion-md-star" />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  renderList() {
    const { id, poster, title } = this.props.showDetails;

    return (
      <div className="tvshow-card">
        <Link to={`/show/${id}`} key={id}>
          <div className="card-content">
            <img src={poster} className="card-image" alt="title" />
            <div className="info-wrapper">
              <h2 className="card-title">{title}</h2>
              {/* <div className="card-genre">{genre}</div> */}
            </div>
          </div>
        </Link>
        <div className="rating-container">{this.displayRating()}</div>
        {this.renderAdminBtns(id)}
      </div>
    );
  }

  render() {
    return this.renderList();
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    userShows: state.user.userShows,
    showDetails: ownProps,
  };
}

export default connect(mapStateToProps, {
  addTVShowToUserTVShows,
  removeTVShowFromUserTVShows,
})(TvShowCard);
