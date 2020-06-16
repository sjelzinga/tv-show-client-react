import React, { Component } from "react";
import "./StarRating.css";

class StarRating extends Component {
  state = {
    stars: [false, false, false, false, false],
    rating: 0
  };

  componentDidUpdate(prevState) {
    // console.log(prevState);
    if (prevState.isSubmitted !== this.props.isSubmitted) {
      this.clearRating();
    }
  }

  onClickRating = e => {
    let rating = parseInt(e.target.id);
    this.props.setStarRating(rating);
    this.setState(
      {
        stars: [false, false, false, false, false],
        rating
      },
      () => this.selectStars(rating)
    );
  };

  selectStars = ratingNumber => {
    let tempArray = [...this.state.stars];
    for (let i = 0; i < ratingNumber; i++) {
      tempArray[i] = true;
    }
    this.setState({
      stars: tempArray
    });
  };

  clearRating = () => {
    this.setState({
      stars: [false, false, false, false, false],
      rating: 0
    });
    this.props.clearSubmit();
  };

  render() {
    const { stars } = this.state;
    return (
      <div>
        <i
          id="1"
          className={`icon ion-md-star star-rating ${
            stars[0] ? "selected" : ""
          }`}
          onClick={this.onClickRating}
        />
        <i
          id="2"
          className={`icon ion-md-star star-rating ${
            stars[1] ? "selected" : ""
          }`}
          onClick={this.onClickRating}
        />
        <i
          id="3"
          className={`icon ion-md-star star-rating ${
            stars[2] ? "selected" : ""
          }`}
          onClick={this.onClickRating}
        />
        <i
          id="4"
          className={`icon ion-md-star star-rating ${
            stars[3] ? "selected" : ""
          }`}
          onClick={this.onClickRating}
        />
        <i
          id="5"
          className={`icon ion-md-star star-rating ${
            stars[4] ? "selected" : ""
          }`}
          onClick={this.onClickRating}
        />
      </div>
    );
  }
}
export default StarRating;
