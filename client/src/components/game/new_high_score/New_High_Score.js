import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { load_new_game } from "../../../actions/game";

class New_High_Score extends Component {
  constructor(props) {
    super(props);
    // document.body.classList.add('jeopardy-blue-dark');
  }

  number_with_commas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  render_high_scores = () => {
    const { high_scores } = this.props.game;

    const output = high_scores.map((high_score, index) => (
      <tr className="tr-high-score bold-text" key={high_score._id}>
        <td>{index + 1}</td>
        <td>{high_score.username}</td>
        <td>{this.number_with_commas(high_score.score)}</td>
      </tr>
    ));

    return output;
  };

  handle_new_game = () => {
    this.props.load_new_game();
  };

  render() {
    return (
      <div>
        <div className="col m8 offset-m2 high-score-column">
          <div className="row">
            <div className="col m4 offset-m4 center-align">
              <div className="high-score-heading jeopardy-white-text bold-text">
                New High Score
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col m8 offset-m2 jeopardy-white high-score-border">
              <table className="highlight centered responsive-table high-score-table">
                <thead>
                  <tr className="tr-high-score bold-text">
                    <th className="">Rank</th>
                    <th className="">Player</th>
                    <th className="">Score</th>
                  </tr>
                </thead>
                <tbody>{this.render_high_scores()}</tbody>
              </table>
            </div>
          </div>
          <div className="row">
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
                    onClick={this.handle_new_game}
                    className="btn  hoverable jeopardy-blue-dark jeopardy-white-text btn-white-border"
                  >
                    <div className="row">
                      <div className="col m3">
                        <i className="material-icons ">attach_money</i>
                      </div>
                      <div className="col m9">New Game</div>
                    </div>
                  </button>
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
  game: state.game
});

export default connect(
  mapStateToProps,
  {
    load_new_game
  }
)(New_High_Score);
