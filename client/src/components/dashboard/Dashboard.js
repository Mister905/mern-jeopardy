import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../layout/loader/Loader";
import { load_user } from "../../actions/auth";
import { get_active_profile } from "../../actions/profile";
import { reset_game } from "../../actions/game";
import mern_logo from "../../assets/img/mern_logo.png";
import logo from "../../assets/img/jeopardy_logo.png";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    document.body.classList.remove("jeopardy-grey");
    document.body.classList.remove("jeopardy-blue-dark");
    document.body.classList.add("jeopardy-gradient");
    this.props.reset_game();
    this.props.load_user();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.auth.user !== this.props.auth.user) {
      const { has_profile } = this.props.auth.user;
      if (has_profile) {
        this.props.get_active_profile();
      }
    }
  };

  render_profile_card = () => {
    let { user } = this.props.auth;
    let { has_profile } = user;
    if (has_profile) {
      return (
        <div>
          <div className="card card-padding jeopardy-grey">
            <Link
              to="/profile"
              className="btn btn-large waves-effect waves-jeopardy-blue hoverable bold-text btn-wide btn-custom mb-13 btn-dashboard"
            >
              <i className="material-icons custom-icon">account_circle</i>
              View Profile
            </Link>
            <Link
              to="/players"
              className="btn btn-large waves-effect waves-jeopardy-blue hoverable bold-text btn-wide btn-custom mb-13 btn-dashboard"
            >
              <i className="material-icons custom-icon">group</i>
              Players
            </Link>
            <Link
              to="/account"
              className="btn btn-large waves-effect waves-jeopardy-blue hoverable bold-text btn-wide btn-custom btn-dashboard"
            >
              <i className="material-icons custom-icon">
                settings_applications
              </i>
              Account
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="card card-padding jeopardy-grey">
            <Link
              to="/create-profile"
              className="btn btn-large waves-effect waves-jeopardy-blue hoverable bold-text btn-wide btn-custom mb-13 btn-dashboard"
            >
              <i className="material-icons custom-icon">person_add</i>
              Create Profile
            </Link>
            <Link
              to="/players"
              className="btn btn-large waves-effect waves-jeopardy-blue hoverable bold-text btn-wide btn-custom mb-13"
            >
              <span className="btn-icon">
                <i className="material-icons btn-icon">group</i>
              </span>
              <span className="btn-text bold-text">Players</span>
            </Link>
            <Link
              to="/account"
              className="btn btn-large waves-effect waves-jeopardy-blue hoverable bold-text btn-wide btn-custom btn-dashboard"
            >
              <i className="material-icons custom-icon">
                settings_applications
              </i>
              Account
            </Link>
          </div>
        </div>
      );
    }
  };

  render() {
    let { loading_user, user } = this.props.auth;
    return (
      <div className="container">
        <div className="row logo-row">
          <div className="col m6">
            <div className="row">
              <div className="col m8 offset-m2">
                <img
                  src={mern_logo}
                  className="responsive-img"
                  alt="MERN Logo"
                />
              </div>
            </div>
            <div className="row">
              <div className="col m12">
                {loading_user || user == null ? (
                  <Loader />
                ) : (
                  this.render_profile_card()
                )}
              </div>
            </div>
          </div>
          <div className="col m6">
            <div className="row">
              <div className="col m8 offset-m2">
                <img
                  src={logo}
                  className="responsive-img logo-img"
                  alt="Jeopardy Logo"
                />
              </div>
            </div>
            <div className="row">
              <div className="col m12">
                <div className="card card-padding jeopardy-grey">
                  <Link
                    to="/game"
                    className="btn btn-large waves-effect waves-jeopardy-blue hoverable bold-text btn-wide btn-custom mb-13 btn-dashboard"
                  >
                    <i className="material-icons custom-icon">attach_money</i>
                    New Game
                  </Link>
                  <Link
                    to="/stats"
                    className="btn btn-large waves-effect waves-jeopardy-blue hoverable bold-text btn-wide btn-custom mb-13 btn-dashboard"
                  >
                    <i className="material-icons custom-icon">star_border</i>
                    Statistics
                  </Link>
                  <Link
                    to="/leaderboard"
                    className="btn btn-large waves-effect waves-jeopardy-blue hoverable bold-text btn-wide btn-custom btn-dashboard"
                  >
                    <i className="material-icons custom-icon">view_list</i>
                    Leaderboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  load_user: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  load_user,
  get_active_profile,
  reset_game
})(Dashboard);
