import React, { Component } from "react";
import { connect } from "react-redux";

import TvShowCard from "./TvShow/TvShowCard";

import { getUserDetails, getUserTVShows } from "../actions";

class Profile extends Component {
  componentDidMount() {
    this.props.getUserDetails();
    this.props.getUserTVShows();
  }

  renderUserShows() {
    if (this.props.user.userShows) {
      return (
        <React.Fragment>
          <h3 style={{ marginLeft: "20px" }}>{`${
            this.props.user.user.username
          }'s Shows`}</h3>
          <div className="list-wrapper">
            {this.props.user.userShows.map(show => {
              return (
                <TvShowCard
                  key={show._id}
                  id={show._id}
                  title={show.title}
                  genre={show.genre}
                  poster={show.poster}
                  ratings={show.ratings}
                />
              );
            })}
          </div>
        </React.Fragment>
      );
    }
    return <div>Loading...</div>;
  }

  renderUsersReviews() {
    return <div />;
  }

  render() {
    const HTML = this.props.user.user && this.renderUserShows();
    return <div>{HTML}</div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getUserDetails, getUserTVShows }
)(Profile);
