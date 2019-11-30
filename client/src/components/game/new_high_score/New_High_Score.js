import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reset_game } from "../../../actions/game";
import logo from "../../../assets/img/jeopardy_logo_profile.png";
import Loader from "../../layout/loader/Loader";

class New_High_Score extends Component {
  constructor(props) {
    super(props);
    document.body.classList.remove("jeopardy-blue-dark");
    document.body.classList.add("jeopardy-gradient");
  }

  componentWillUnmount = () => {
    document.body.classList.remove("jeopardy-gradient");
  };

  number_with_commas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  handle_new_game = () => {
    this.props.reset_game();
  };

  render() {
    const { loading_leaderboard, leaderboard } = this.props.leaderboard;

    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card col m12 jeopardy-grey">
            <div className="row mt-25">
              <div className="col m4 offset-m4 center-align">
                <img src={logo} className="responsive-img profile-logo" />
              </div>
            </div>
            <div className="row">
              <div className="col m4 offset-m4 center-align">
                <div className="jeopardy-blue-dark-text leaderboard-heading bold-text">
                  New High Score
                </div>
              </div>
            </div>
            {loading_leaderboard ? (
              <Loader />
            ) : (
              <div>
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
                        {leaderboard.map((leader, index) => (
                          <tr key={index} className="bold-text">
                            <td
                              className={`center-align ${
                                this.props.leaderboard.new_high_score_id ==
                                leader.score_id
                                  ? "jeopardy-orange-text"
                                  : "jeopardy-blue-dark-text"
                              }`}
                            >
                              {index + 1}
                            </td>
                            <td
                              className={`center-align ${
                                this.props.leaderboard.new_high_score_id ==
                                leader.score_id
                                  ? "jeopardy-orange-text"
                                  : "jeopardy-blue-dark-text"
                              }`}
                            >
                              <Link
                                className={`center-align ${
                                  this.props.leaderboard.new_high_score_id ==
                                  leader.score_id
                                    ? "jeopardy-orange-text"
                                    : "jeopardy-blue-dark-text"
                                }`}
                                to={`leaderboard/profile/${leader.user_id}`}
                              >
                                {leader.name}
                              </Link>
                            </td>
                            <td
                              className={`center-align ${
                                this.props.leaderboard.new_high_score_id ==
                                leader.score_id
                                  ? "jeopardy-orange-text"
                                  : "jeopardy-blue-dark-text"
                              }`}
                            >
                              {leader.score}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row mt-25">
                  <div className="col m6 offset-m3">
                    <div className="row">
                      <div className="col m4 offset-m1">
                        <Link
                          to="/dashboard"
                          className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-custom btn-wide"
                        >
                          <i className="material-icons custom-icon">home</i>
                          <span className="home-span">Home</span>
                        </Link>
                      </div>
                      <div className="col m4 offset-m2">
                        <button
                          onClick={this.handle_new_game}
                          className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-custom btn-wide"
                        >
                          <i className="material-icons custom-icon">
                            attach_money
                          </i>
                          <span className="new-game-span">New Game</span>
                        </button>
                      </div>
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

const mapStateToProps = state => ({
  game: state.game,
  leaderboard: state.leaderboard
});

export default connect(mapStateToProps, {
  reset_game
})(New_High_Score);
