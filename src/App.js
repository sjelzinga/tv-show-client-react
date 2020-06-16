import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import history from "./helpers/history";
import authService from "./authService";
import Navbar from "./components/Navbar/Navbar";
import TvShowsList from "./components/TvShow/TvShowsList";
import FilterForm from "./components/Forms/FilterForm";
import TvShowDetail from "./components/TvShow/TvShowDetail";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ProtectedRoute } from "./helpers/ProtectedRoute";
import "./App.css";

import {
  setUserAuthentication,
  getUserDetails,
  getUserTVShows
} from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.setUserAuthentication();
    if (authService.isAuthenticated()) {
      this.props.getUserDetails();
      this.props.getUserTVShows();
    }
  }

  render() {
    return (
      <div className="App preload">
        <Router history={history}>
          <Navbar />
          <Route path="/" exact component={FilterForm} />
          <Route path="/" exact component={TvShowsList} />
          <Route path="/show/:id" component={TvShowDetail} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { setUserAuthentication, getUserDetails, getUserTVShows }
)(App);
