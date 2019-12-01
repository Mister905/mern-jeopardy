import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CurrencyInput from "react-currency-input";
import FinalJeopardy from "../../../assets/img/final_jeopardy_edit.png";
import {
  handle_final_jeopardy_wager,
  handle_all_in,
  final_jeopardy_response
} from "../../../actions/game";

class Final_Jeopardy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_final_jeopardy: true,
      display_final_jeopardy_wager_form: false,
      final_jeopardy_wager: 0,
      display_final_jeopardy_answer: false,
      is_all_in: false
    };
  }

  number_with_commas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  display_question = question => {
    return this.format_text(question);
  };

  on_change = (e, maskedvalue, floatvalue) => {
    this.setState(prevState => {
      return {
        ...prevState,
        final_jeopardy_wager: floatvalue
      };
    });
  };

  handle_all_in = e => {
    e.preventDefault();

    const { winnings } = this.props.game;

    this.setState(prevState => {
      return {
        ...prevState,
        final_jeopardy_wager: winnings,
        display_final_jeopardy_wager_form: false
      };
    });

    this.props.handle_all_in();
  };

  handle_final_jeopardy_wager = async e => {
    e.preventDefault();

    const { final_jeopardy_wager } = this.state;
    // console.log(final_jeopardy_wager)
    const { winnings } = this.props.game;
    // console.log(winnings)
    this.setState(prevState => {
      return {
        ...prevState,
        final_jeopardy_wager,
        display_final_jeopardy_wager_form: false
      };
    });

    this.props.handle_final_jeopardy_wager(final_jeopardy_wager, winnings);
  };

  display_wager_form = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        display_final_jeopardy_wager_form: true,
        display_final_jeopardy: false
      };
    });
  };

  display_answer = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        display_final_jeopardy_answer: true
      };
    });
  };

  format_text = text => {
    if (text) {
      try {
        // Remove possible HTML tags
        var res = text.replace(/<\/?[^>]+(>|$)/g, "");
        // Remove possible escape characters
        res = res.replace(/\\/g, "");
        // Add space after comma
        res = res.replace(/,/g, ", ");
        return res;
      } catch (error) {
        console.log(error);
        return text;
      }
    }
  };

  format_answer = text => {
    if (text) {
      try {
        // Remove possible HTML tags
        var res = text.replace(/<\/?[^>]+(>|$)/g, "");
        // Remove possible escape characters
        res = res.replace(/\\/g, "");
        // Add space after comma
        res = res.replace(/,/g, ", ");
        // Make lowercase
        res = res.toLowerCase();
        return res;
      } catch (error) {
        console.log(error);
        return text;
      }
    }
  };

  final_jeopardy_response = (response, final_jeopardy_wager) => {
    if (response === "correct") {
      this.props.final_jeopardy_response("correct", final_jeopardy_wager);
    } else {
      this.props.final_jeopardy_response("incorrect", final_jeopardy_wager);
    }
  };

  render() {
    const {
      display_final_jeopardy,
      display_final_jeopardy_wager_form,
      display_final_jeopardy_answer,
      final_jeopardy_wager
    } = this.state;

    const {
      winnings,
      display_final_jeopardy_question,
      final_jeopardy_question
    } = this.props.game;

    const { question, answer, category } = final_jeopardy_question;

    return (
      <div>
        {display_final_jeopardy && (
          <div className="final-container">
            <div className="row">
              <div className="col m8 offset-m2 clue-col jeopardy-blue final-col">
                <div className="row">
                  <div className="col m6 offset-m3">
                    <img
                      src={FinalJeopardy}
                      className="final-jeopardy-img"
                      alt="Final Jeopardy"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col m12 center-align">The category is...</div>
                </div>
                <div className="row">
                  <div className="col m12 center-align">{category.title}</div>
                </div>
                <div className="row">
                  <div className="col m6 offset-m3">
                    <button
                      onClick={this.display_wager_form}
                      className="btn btn-large btn-wide jeopardy-white jeopardy-blue-text bold-text btn-continue"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {display_final_jeopardy_wager_form && (
          <div className="final-container">
            <div className="row">
              <div className="col m8 offset-m2 jeopardy-grey">
                <div className="row wager-row">
                  <div className="col m12">
                    <div className="current-winnings-heading center-align jeopardy-blue-dark-text bold-text">
                      Current Winnings:{" "}
                      <span className="wager-span">
                        ${this.number_with_commas(winnings)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col m12">
                    <div className="center-align jeopardy-blue-dark-text bold-text current-winnings-heading">
                      You may wager up to{" "}
                      <span className="wager-span">
                        ${this.number_with_commas(winnings)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col m10 offset-m1">
                    <div className="row">
                      <div className="col m8 offset-m2">
                        <form noValidate>
                          <div className="currency-input-field">
                            <div className="input-field">
                              <CurrencyInput
                                id="final_jeopardy_wager"
                                className="final-jeopardy-wager"
                                prefix="$"
                                value={this.state.final_jeopardy_wager}
                                onChangeEvent={this.on_change}
                              />
                              <label
                                className="active bold-text wager-label"
                                htmlFor="daily_double_wager"
                              >
                                Wager
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col m6">
                              <button
                                onClick={this.handle_all_in}
                                className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-text"
                              >
                                All In
                              </button>
                            </div>
                            <div className="input-field col m6">
                              <button
                                onClick={this.handle_final_jeopardy_wager}
                                className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-text"
                              >
                                Wager
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {display_final_jeopardy_question && (
          <div className="final-container">
            <div className="row">
              <div className="col m8 offset-m2 jeopardy-blue clue-col">
                <div className="row clue-row">
                  <div className="col m12 center-align">
                    <div className="jeopardy-white-text output-size">
                      {this.format_text(question)}
                    </div>
                  </div>
                </div>

                {display_final_jeopardy_answer == false && (
                  <div className="row reveal-button-row">
                    <div className="col m12 center-align">
                      <a
                        onClick={this.display_answer}
                        className="btn jeopardy-blue-text jeopardy-white bold-text"
                      >
                        <i className="material-icons left icon-margin">
                          lightbulb_outline
                        </i>
                        Reveal Answer
                      </a>
                    </div>
                  </div>
                )}
                {display_final_jeopardy_answer && (
                  <div>
                    <div className="row answer-row">
                      <div className="col m4 offset-m4 center-align">
                        <div className="output-size answer-output output-size answer-output jeopardy-white-text">
                          {this.format_answer(answer)}
                        </div>
                      </div>
                    </div>
                    <div className="row response-row">
                      <div className="col m10 offset-m1 center-align">
                        <div className="center-align jeopardy-white-text output-size">
                          How did you do?
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col m4 offset-m4">
                        <div className="row mt-row">
                          <div className="col m3 offset-m2 center-align">
                            <a
                              onClick={() =>
                                this.final_jeopardy_response(
                                  "incorrect",
                                  final_jeopardy_wager
                                )
                              }
                              className="btn btn-wide jeopardy-white jeopardy-red-text"
                            >
                              <i className="material-icons highlight_off">
                                highlight_off
                              </i>
                            </a>
                          </div>
                          <div className="col m3 offset-m2 center-align">
                            <a
                              onClick={() =>
                                this.final_jeopardy_response(
                                  "correct",
                                  final_jeopardy_wager
                                )
                              }
                              className="btn btn-wide jeopardy-white jeopardy-green-text"
                            >
                              <i className="material-icons response-icon">
                                check
                              </i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps, {
  handle_final_jeopardy_wager,
  handle_all_in,
  final_jeopardy_response
})(withRouter(Final_Jeopardy));
