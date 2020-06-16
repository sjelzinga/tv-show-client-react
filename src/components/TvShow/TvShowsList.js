import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchShows, filterShows } from '../../actions';

import TvShowCard from './TvShowCard';
import './TvShowsList.css';

class TvShowsList extends Component {
  componentDidMount() {
    this.props.fetchShows();
  }

  componentDidUpdate(prevProps) {
    const { searchValue, filterShows } = this.props;
    if (prevProps.searchValue !== searchValue) {
      filterShows({ detail: 'title', searchValue });
    }
  }

  selectListToRender() {
    const { allShows, filteredShows } = this.props;
    return filteredShows.length === 0 ? allShows : filteredShows;
  }

  renderShows() {
    const shows = this.selectListToRender();
    return (
      <div className="list-wrapper">
        {shows.map((show) => {
          return (
            <TvShowCard
              key={show._id}
              id={show._id}
              title={show.title}
              genre={show.genre}
              poster={show.poster}
              ratings={show.ratings}
              addToUserList={this.addToUserList}
            />
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1 style={{ margin: '1.5rem 0 0 1.5rem' }}>Tv Shows</h1>
        {this.props.showNotFound ? 'Show not found' : this.renderShows()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allShows: state.shows.allShows,
    filteredShows: state.shows.filteredShows,
    showNotFound: state.shows.showNotFound,
    searchValue: state.search.searchValue,
  };
}

export default connect(mapStateToProps, { fetchShows, filterShows })(
  TvShowsList
);
