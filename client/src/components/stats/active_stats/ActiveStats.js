import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../../layout/loader/Loader";
import {
  get_active_statistics,
  clear_player_statistics
} from "../../../actions/statistics";
import logo from "../../../assets/img/jeopardy_logo_profile.png";

class ActiveStats extends Component {
  componentDidMount = () => {
    this.props.get_active_statistics();
  };

  number_with_commas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  render() {
    const { loading_statistics } = this.props.statistics;
    const { first_name, last_name } = this.props.auth.user;
    const {
      games_played,
      correct_responses,
      incorrect_responses,
      career_earnings
    } = this.props.statistics;
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card col m12 jeopardy-grey">
            <div className="row mt-25">
              <div className="col m2 center-align">
                <Link
                  to="/dashboard"
                  className="btn btn-custom btn-text btn-back waves-effect waves-jeopardy-blue"
                >
                  <i className="material-icons  bold-text">arrow_back</i>
                </Link>
              </div>
              <div className="col m4 offset-m2 center-align">
                <img src={logo} className="responsive-img profile-logo" />
              </div>
            </div>
            <div className="row">
              <div className="col m4 offset-m4 center-align">
                <div className="jeopardy-blue-dark-text custom-heading bold-text">
                  Statistics
                </div>
              </div>
            </div>
            {loading_statistics ? (
              <Loader />
            ) : (
              <div>
                <div className="row">
                  <div className="col m6 offset-m3">
                    <div className="card active-stats-card">
                      <table>
                        <tbody>
                          <tr>
                            <td className="center-align bold-text">Player</td>
                            <td className="center-align">{`${first_name} ${last_name}`}</td>
                          </tr>
                          <tr>
                            <td className="center-align bold-text">Games Played</td>
                            <td className="center-align">{games_played}</td>
                          </tr>
                          <tr>
                            <td className="center-align bold-text">Correct Responses</td>
                            <td className="center-align">{correct_responses}</td>
                          </tr>
                          <tr>
                            <td className="center-align bold-text">Incorrect Responses</td>
                            <td className="center-align">{incorrect_responses}</td>
                          </tr>
                          <tr>
                            <td className="center-align bold-text">Career Earnings</td>
                            <td className="center-align">${this.number_with_commas(career_earnings)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
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

export default connect(mapStateToProps, {
  get_active_statistics,
  clear_player_statistics
})(ActiveStats);
