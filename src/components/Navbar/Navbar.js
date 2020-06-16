import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../../actions";
import "./Navbar.css";

class Navbar extends Component {
  Logout = () => {
    this.props.logoutUser();
  };

  renderMenuBtns() {
    const userNav = (
      <React.Fragment>
        <li>
          <Link className="nav-list-item" to="/profile">
            My shows
          </Link>
        </li>
        <li>
          <button className="nav-list-item" onClick={this.Logout}>
            Logout
          </button>
        </li>
      </React.Fragment>
    );

    const standardNav = (
      <React.Fragment>
        <li>
          <Link className="nav-list-item" to="/signup">
            Signup
          </Link>
        </li>
        <li>
          <Link className="nav-list-item" to="/login">
            Login
          </Link>
        </li>
      </React.Fragment>
    );
    return this.props.isAuthenticated ? userNav : standardNav;
  }

  render() {
    return (
      <nav className="navbar">
        <ul>
          <li>
            <Link className="nav-list-item" to="/">
              Home
            </Link>
          </li>
          {this.renderMenuBtns()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
}

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
