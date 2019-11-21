import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../../layout/loader/Loader";
import { get_active_statistics } from "../../../actions/statistics";
import Logo from "../../../assets/img/logo-secondary.png";

class ActiveStats extends Component {
  componentDidMount = () => {
    this.props.get_active_statistics();
  };

  number_with_commas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  render_stats = () => {
    const { user } = this.props.auth;
    const {
      games_played,
      correct_responses,
      incorrect_responses,
      career_earnings
    } = this.props.statistics;
    return (
      <div>
        <div className="row">
          <div className="col m6 offset-m3">
            <div className="card active-stats-card">
              <div className="collection active-stats-collection jeopardy-blue-dark-text">
                <div className="collection-item active-stats-collection-item center-align">
                  <span className="bold-text">Games Played: </span>
                  <span>{games_played}</span>
                </div>
                <div className="collection-item active-stats-collection-item center-align">
                  <span className="bold-text">Correct Responses: </span>
                  <span>{correct_responses}</span>
                </div>
                <div className="collection-item active-stats-collection-item center-align">
                  <span className="bold-text">Incorrect Responses: </span>
                  <span>{incorrect_responses}</span>
                </div>
                <div className="collection-item active-stats-collection-item center-align last">
                  <span className="bold-text">Career Earnings: </span>
                  <span>${this.number_with_commas(career_earnings)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col m4 offset-m4 center-align">
              <img src={Logo} className="silver-logo-img" alt="Jeopardy Logo" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading_statistics } = this.props.statistics;
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card active-stats-card col m12">
            <div className="row mt-row">
              <div className="col m2">
                <Link
                  to="/dashboard"
                  className="btn btn-small btn-custom hoverable bold-text btn-small"
                >
                  <i className="material-icons left  bold-text">
                    keyboard_backspace
                  </i>
                  Back
                </Link>
              </div>
              <div className="col m4 offset-m2 center-align">
                <div className="jeopardy-blue-dark-text leaderboard-heading bold-text">
                  Player Statistics
                </div>
              </div>
            </div>
            {loading_statistics ? <Loader /> : this.render_stats()}
          </div>
        </div>
      </div>
    );
  }
}

ActiveStats.propTypes = {
  auth: PropTypes.object.isRequired,
  statistics: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  statistics: state.statistics
});

export default connect(mapStateToProps, { get_active_statistics })(ActiveStats);
