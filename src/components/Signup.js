import React, { Component } from "react";
import { connect } from "react-redux";

import InputField from "./styledComponents/InputField";
import Button from "./styledComponents/Button";
import ToastMessage from "./styledComponents/ToastMessage";

import "./Signup.css";

import { createUser } from "../actions";

class Signup extends Component {
  state = {
    username: "Bob",
    email: "bob@example.com",
    password: "welcome"
  };

  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    const user = { username, email, password };
    this.props.createUser(user);
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div className="signup-wrapper">
        <ToastMessage
          showToast={this.props.isSignupSucceeded}
          msg="Signup succeeded"
        />
        <h1>Signup</h1>
        <form onSubmit={this.onSubmit}>
          <div className="signup-input-wrapper">
            <label>Username</label>
            <InputField
              name="username"
              type="username"
              placeholder="Username"
              value={username}
              onChange={this.onInputChange}
            />
          </div>
          <div className="signup-input-wrapper">
            <label>E-mail</label>
            <InputField
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={this.onInputChange}
            />
          </div>
          <div className="signup-input-wrapper">
            <label>Password</label>
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.onInputChange}
            />
          </div>
          <Button className="primary-button" type="submit">
            Signup
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignupSucceeded: state.user.isSignupSucceeded
  };
};

export default connect(
  mapStateToProps,
  { createUser }
)(Signup);
