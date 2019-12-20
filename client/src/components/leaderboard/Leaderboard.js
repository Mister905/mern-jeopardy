import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../layout/loader/Loader";
import { get_leaderboard, clear_leaderboard } from "../../actions/leaderboard";
import { clear_player_profile } from "../../actions/profile";
import logo from "../../assets/img/jeopardy_logo_profile.png";

class Leaderboard extends Component {
  componentDidMount = () => {
    this.props.get_leaderboard();
  };

  componentWillUnmount = () => {
    this.props.clear_leaderboard();
  };

  render_leaderboard = () => {
    const { leaderboard } = this.props.leaderboard;
    return (
      <div className="row">
        <div className="col m6 offset-m3">
          <table>
            <thead>
              <tr className="tr-high-score bold-text jeopardy-blue-dark-text">
                <th className="center-align">Rank</th>
                <th className="center-align">Player</th>
                <th className="center-align">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((high_score, index) => (
                <tr key={index} className="bold-text">
                  <td className="center-align jeopardy-blue-dark-text">
                    {index + 1}
                  </td>
                  <td className="center-align jeopardy-blue-dark-text">
                    <Link
                      className="jeopardy-blue-dark-text"
                      to={`leaderboard/profile/${high_score.user_id}`}
                    >
                      {high_score.name}
                    </Link>
                  </td>
                  <td className="center-align jeopardy-blue-dark-text">
                    {high_score.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  render() {
    const { loading_leaderboard } = this.props.leaderboard;
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
                  <i className="material-icons bold-text">arrow_back</i>
                </Link>
              </div>
              <div className="col m4 offset-m2 center-align">
                <img src={logo} className="responsive-img profile-logo" />
              </div>
            </div>
            <div className="row">
              <div className="col m4 offset-m4 center-align">
                <div className="jeopardy-blue-dark-text custom-heading bold-text">
                  Leaderboard
                </div>
              </div>
            </div>
            {loading_leaderboard ? <Loader /> : this.render_leaderboard()}
          </div>
        </div>
      </div>
    );
  }
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  leaderboard: state.leaderboard
});

export default connect(mapStateToProps, {
  get_leaderboard,
  clear_player_profile,
  clear_leaderboard
})(Leaderboard);
