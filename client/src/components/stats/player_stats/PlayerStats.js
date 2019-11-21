import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../../layout/loader/Loader";
import {
  get_player_statistics,
  clear_player_statistics
} from "../../../actions/statistics";
import Logo from "../../../assets/img/logo-secondary.png";

class PlayerStats extends Component {
  constructor(props) {
    super(props);
    document.body.classList.add("jeopardy-blue-dark");
    this.props.clear_player_statistics();
  }

  number_with_commas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  componentDidMount = () => {
    let user_id = this.props.match.params.user_id;
    this.props.get_player_statistics(user_id);
  };

  render_stats = () => {
    const {
      games_played,
      correct_responses,
      incorrect_responses,
      career_earnings
    } = this.props.statistics;
    return (
      <div className="row">
        <div className="col m6 offset-m3">
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
        <div className="row">
          <div className="col m4 offset-m4 center-align">
            <img src={Logo} className="silver-logo-img" alt="Jeopardy Logo" />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading_statistics } = this.props.statistics;
    const { player_name } = this.props.profile;
    const { user_id } = this.props.match.params;
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card active-stats-card col m12">
            <div className="row mt-row">
              <div className="col m2 center-align">
                <Link
                  to={`/leaderboard/profile/${user_id}`}
                  className="btn btn-small hoverable bold-text btn-custom"
                >
                  <i className="material-icons left  bold-text">
                    keyboard_backspace
                  </i>
                  Back
                </Link>
              </div>
              <div className="col m4 offset-m2 center-align">
                <div className="jeopardy-blue-dark-text player-stats-heading bold-text">
                  {player_name}
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

PlayerStats.propTypes = {
  statistics: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  statistics: state.statistics,
  profile: state.profile
});

export default connect(mapStateToProps, {
  get_player_statistics,
  clear_player_statistics
})(withRouter(PlayerStats));
