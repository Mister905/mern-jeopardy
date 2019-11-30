import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reset_game } from "../../../actions/game";
import logo from "../../../assets/img/jeopardy_logo_profile.png";

class Game_Over extends Component {
  constructor(props) {
    super(props);
    document.body.classList.remove("jeopardy-blue-dark");
    document.body.classList.add("jeopardy-gradient");
  }
  number_with_commas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  handle_new_game = () => {
    this.props.reset_game();
  };

  render() {
    const { name } = this.props.auth.user;
    const { final_earnings } = this.props.game;
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card col m12 jeopardy-grey">
            <div className="row mt-25">
              <div className="col m4 offset-m4 center-align">
                <img src={logo} className="responsive-img profile-logo" />
              </div>
            </div>
            <div className="row mt-row">
              <div className="col m4 offset-m4 center-align">
                <div className="jeopardy-blue-dark-text custom-heading bold-text">
                  Game Over
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m4 offset-m4 center-align">
                <div className="jeopardy-blue-dark-text custom-heading bold-text">
                  {name}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m4 offset-m4 center-align">
                <div className="jeopardy-blue-dark-text custom-heading bold-text">
                  Final Earnings: ${this.number_with_commas(final_earnings)}
                </div>
              </div>
            </div>
            <div className="row mt-row">
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
                      <i className="material-icons custom-icon">attach_money</i>
                      <span className="new-game-span">New Game</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  game: state.game
});

export default connect(mapStateToProps, {
  reset_game
})(Game_Over);
