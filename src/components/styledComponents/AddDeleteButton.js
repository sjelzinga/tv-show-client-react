import React, { Component } from "react";

import "./AddDeleteButton.css";

class AddDeleteButton extends Component {
  onButtonClick = () => {
    const { showId, addMethod, deleteMethod } = this.props;
    this.props.isAdded ? deleteMethod(showId) : addMethod(showId);
  };

  render() {
    const cssClasses = ["button", this.props.isAdded ? "delete" : "add"];
    return (
      <React.Fragment>
        <button className={cssClasses.join(" ")} onClick={this.onButtonClick}>
          +
        </button>
      </React.Fragment>
    );
  }
}

export default AddDeleteButton;
