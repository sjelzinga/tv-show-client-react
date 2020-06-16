import React, { Component } from "react";
import { connect } from "react-redux";

import InputField from "./styledComponents/InputField";
import Button from "./styledComponents/Button";
import "./Login.css";

import { LoginUser } from "../actions";

class Login extends Component {
  state = {
    email: "kim@example.com",
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
    const { email, password } = this.state;
    const user = { email, password };
    this.props.LoginUser(user);
  };

  render() {
    return (
      <div className="login-wrapper">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div className="login-input-wrapper">
            <label>E-mail</label>
            <InputField
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onInputChange}
            />
          </div>
          <div className="login-input-wrapper">
            <label>Password</label>
            <InputField
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
          </div>
          <Button className="primary-button" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { LoginUser }
)(Login);
