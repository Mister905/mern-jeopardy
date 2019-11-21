import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";
import nav_logo from "../../../assets/img/nav_jeopardy_logo.png";

class Navbar extends Component {
  state = {
    is_game_active: false
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.game !== this.props.game) {
      const { is_game_active } = this.props.game;
      this.setState({
        is_game_active
      });
    }
  };

  handle_logout = () => {
    this.props.logout();
  };

  render_navbar = () => {
    const { loading_user } = this.props.auth;
    if (loading_user) {
      return null;
    } else {
      const { first_name } = this.props.auth.user;
      return (
        <ul id="nav-mobile" className="right hide-on-med-and-down ul-nav">
          <div className="nav-div">
            <li className="li-nav li-nav-username">
              <i className="material-icons center-align left  nav-profile-icon">
                account_circle
              </i>
              {first_name}
            </li>
            <li className="li-nav li-nav-logout">
              <a
                className="a-nav nav-link btn btn-small amber darken-4"
                onClick={this.handle_logout}
              >
                logout
              </a>
            </li>
          </div>
        </ul>
      );
    }
  };

  render() {
    return (
      <nav className="custom-nav">
        <div
          className={
            "nav-wrapper " +
            (this.state.is_game_active ? "nav-white-border" : "")
          }
        >
          <Link to="/" className="a-nav">
            <img className="nav-logo responsive-img" src={nav_logo} alt="" />
          </Link>
          {this.render_navbar()}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  game: state.game
});

export default connect(mapStateToProps, { logout })(Navbar);
