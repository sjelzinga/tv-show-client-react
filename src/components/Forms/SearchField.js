import React, { Component } from "react";
import { connect } from "react-redux";

import { searchTVShow, clearSearchField } from "../../actions";
import "./SearchField.css";

class SearchField extends Component {
  onInputChange = e => {
    const value = e.target.value.toLowerCase();
    this.props.searchTVShow(value);
    if (e.target.value === "") this.props.clearSearchField();
  };

  onClearBtnClick = () => {
    this.props.clearSearchField();
  };

  render() {
    const { hasValue, value } = this.props;

    const clearSearchBtn = hasValue ? (
      <button
        name="search"
        onClick={this.onClearBtnClick}
        className="clear-field-btn"
      >
        &times;
      </button>
    ) : null;

    return (
      <React.Fragment>
        <div className="input-field">
          <i className="icon ion-md-search" />
          <input
            className="search-field-input"
            placeholder="Search"
            value={value}
            onChange={this.onInputChange}
          />
          {clearSearchBtn}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasValue: state.search.hasSearchValue,
    value: state.search.searchValue
  };
};

export default connect(
  mapStateToProps,
  { searchTVShow, clearSearchField }
)(SearchField);
