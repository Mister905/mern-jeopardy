import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reset_game } from "../../../actions/game";
import Logo from "../../../assets/img/silver-logo.png";

class Game_Over extends Component {
  number_with_commas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
  render_final_score = () => {
    const { name } = this.props.auth.user;
    const { final_earnings } = this.props.game;
    const output = (
      <div className="row">
        <div className="col m12">
          <div className="card game-over-card">
            <div className="card-content custom-card-content">
              <div className="row">
                <div className="col m12 center-align">
                  <img
                    src={Logo}
                    className="silver-logo-img"
                    alt="Jeopardy Logo"
                  />
                </div>
              </div>
              <div className="row game-over-row">
                <div className="col m12">
                  <span className="card-title center-align bold-text game-over-title jeopardy-white-text">
                    Game Over
                  </span>
                </div>
              </div>
              <div className="row name-row">
                <div className="col m12 center-align">
                  <span className="game-over-name jeopardy-white-text">
                    {name}
                  </span>
                </div>
              </div>
              <div className="row final-earnings-row">
                <div className="col m12 center-align">
                  <span className="game-over-earnings jeopardy-white-text">
                    Final Earnings: ${final_earnings}
                  </span>
                </div>
              </div>
              <div className="row btn-row">
                <div className="col m10 offset-m1">
                  <div className="row">
                    <div className="col m6 center-align">
                      <Link
                        to="/dashboard"
                        className="btn  hoverable jeopardy-blue-dark jeopardy-white-text btn-white-border"
                      >
                        <div className="row">
                          <div className="col m3">
                            <i className="material-icons ">home</i>
                          </div>
                          <div className="col m9">Home</div>
                        </div>
                      </Link>
                    </div>
                    <div className="col m6 center-align">
                      <button
                        onClick={this.handle_reset}
                        className="btn  hoverable jeopardy-blue-dark jeopardy-white-text btn-white-border"
                      >
                        <div className="row">
                          <div className="col m3">
                            <i className="material-icons ">
                              attach_money
                            </i>
                          </div>
                          <div className="col m9">New Game</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row button-row">
                <div className="col m6 center-align">
                  <Link
                    to="/dashboard"
                    className="btn  hoverable jeopardy-white-text jeopardy-blue-dark bold-text btn-home"
                  >
                    <div className="row">
                      <div className="col m3">
                        <i className="material-icons ">home</i>
                      </div>
                      <div className="col m9">Home</div>
                    </div>
                  </Link>
                </div>
                <div className="col m6 center-align">
                  <button
                    onClick={this.handle_new_game}
                    className="btn  hoverable jeopardy-white-text jeopardy-blue-dark bold-text"
                  >
                    <div className="row">
                      <div className="col m3">
                        <i className="material-icons ">attach_money</i>
                      </div>
                      <div className="col m9">New Game</div>
                    </div>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
    return output;
  };

  handle_new_game = () => {
    this.props.reset_game();
  };

  render() {
    return (
      <div>
        <div className="col m8 offset-m2">{this.render_final_score()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  game: state.game
});

export default connect(
  mapStateToProps,
  {
    reset_game
  }
)(Game_Over);
