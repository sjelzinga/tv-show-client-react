import React, { Component } from "react";
import { connect } from "react-redux";

import { filterShows } from "../../actions";
import "./SearchGenre.css";

class SearchGenre extends Component {
  state = {
    value: ""
  };

  onSelectChange = e => {
    console.log(e.target.value);
    this.props.filterShows({ detail: "genre", searchValue: e.target.value });
  };

  render() {
    return (
      <div className="custom-select">
        <select onChange={this.onSelectChange}>
          <option value="all">All</option>
          <option value="mystery">Mystery</option>
          <option value="drama">Drama</option>
          <option value="thriller">Thriller</option>
          <option value="crime">Crime</option>
        </select>
      </div>
    );
  }
}

export default connect(
  null,
  { filterShows }
)(SearchGenre);
