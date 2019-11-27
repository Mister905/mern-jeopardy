import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  answer_response,
  display_wager_form,
  handle_daily_double_wager,
  handle_true_daily_double
} from "../../../../actions/game";
import CurrencyInput from "react-currency-input";

class Focus extends Component {
  constructor(props) {
    super(props);

    const { is_first_round, is_second_round } = this.props.game;
    if (is_first_round) {
      const { id } = this.props.location.state;
      const daily_doubles = this.props.game.daily_doubles;
      const daily_double_id = daily_doubles[0];
      if (id === daily_double_id) {
        this.state = {
          display_answer: false,
          display_daily_double: true,
          daily_double_wager: 0,
          display_question: false
        };
      } else {
        this.state = {
          display_answer: false,
          display_daily_double: false,
          daily_double_wager: 0,
          display_question: true
        };
      }
    } else if (is_second_round) {
      const daily_doubles = this.props.game.daily_doubles;
      const daily_double_id_1 = daily_doubles[0];
      const daily_double_id_2 = daily_doubles[1];
      var question = this.props.location.state.question;
      const { id } = question;
      if (id === daily_double_id_1 || id === daily_double_id_2) {
        this.state = {
          display_answer: false,
          display_daily_double: true,
          daily_double_wager: 0,
          display_question: false
        };
      } else {
        this.state = {
          display_answer: false,
          display_daily_double: false,
          daily_double_wager: 0,
          display_question: true
        };
      }
    }
  }

  display_wager_form = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        display_daily_double: false
      };
    });
    this.props.display_wager_form();
  };

  on_change = (e, maskedvalue, floatvalue) => {
    this.setState(prevState => {
      return {
        ...prevState,
        daily_double_wager: floatvalue
      };
    });
  };

  handle_true_daily_double = e => {
    e.preventDefault();

    const true_daily_double = this.props.game.winnings;

    this.props.handle_true_daily_double(true_daily_double);
  };

  handle_manual_wager = async e => {
    e.preventDefault();

    const { daily_double_wager } = this.state;

    const { winnings } = this.props.game;

    this.props.handle_daily_double_wager(daily_double_wager, winnings);
  };

  update_display_answer_state = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        display_answer: true
      };
    });
  };

  answer_response = (response, is_daily_double = false) => {
    if (is_daily_double) {
      const { true_daily_double, winnings } = this.props.game;
      if (true_daily_double) {
        if (response.response === "incorrect") {
          response.is_daily_double = true;
          response.incorrect_daily_double = true;
          response.value = winnings;
          this.setState(prevState => {
            return {
              ...prevState,
              display_question: false
            };
          });
        } else {
          response.is_daily_double = true;
          response.correct_daily_double = true;
          response.value = winnings;
          this.setState(prevState => {
            return {
              ...prevState,
              display_question: false
            };
          });
        }
      } else {
        if (response.response === "incorrect") {
          response.is_daily_double = true;
          response.incorrect_daily_double = true;
          response.value = this.state.daily_double_wager;
          this.setState(prevState => {
            return {
              ...prevState,
              display_question: false
            };
          });
        } else {
          response.is_daily_double = true;
          response.correct_daily_double = true;
          response.value = this.state.daily_double_wager;
          this.setState(prevState => {
            return {
              ...prevState,
              display_question: false
            };
          });
        }
      }
    }
    
    this.props.answer_response(response, this.props.history);
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

  display_question = object => {
    if (object.question.question) {
      return this.format_text(object.question.question);
    } else {
      return this.format_text(object.question);
    }
  };

  display_answer = object => {
    if (object.answer) {
      return this.format_answer(object.answer);
    } else {
      return this.format_answer(object.question.answer);
    }
  };

  number_with_commas = x => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  render() {
    const {
      display_daily_double,
      display_question,
      display_answer,
      daily_double_wager
    } = this.state;

    const {
      is_first_round,
      is_second_round,
      is_final_jeopardy,
      answered_questions,
      winnings,
      display_daily_double_wager,
      display_daily_double_question
    } = this.props.game;

    const answered_questions_length = answered_questions.length;

    let id = null;

    let question = null;

    let answer = null;

    let value = null;

    let correct_response = null;

    let correct_daily_double = null;

    let question_obj = this.props.location.state;

    if (question_obj.hasOwnProperty("custom")) {
      const { custom } = question_obj;
      id = question_obj.question.id;
      question = question_obj.question.question;
      answer = question_obj.question.answer;

      correct_response = {
        response: "correct",
        question_id: id,
        value: custom,
        answered_questions_length
      };

      correct_daily_double = {
        is_daily_double: true,
        response: "correct",
        question_id: id,
        value: daily_double_wager,
        answered_questions_length
      };
    } else {
      id = question_obj.id;
      question = question_obj.question;
      answer = question_obj.answer;
      value = question_obj.value;
      correct_response = {
        response: "correct",
        question_id: id,
        value: value,
        answered_questions_length
      };
      correct_daily_double = {
        is_daily_double: true,
        response: "correct",
        question_id: id,
        value: daily_double_wager,
        answered_questions_length
      };
    }

    const incorrect_response = {
      response: "incorrect",
      question_id: id,
      answered_questions_length
    };

    const incorrect_daily_double = {
      is_daily_double: true,
      response: "incorrect",
      question_id: id,
      value: daily_double_wager,
      answered_questions_length
    };

    return (
      <div>
        {display_daily_double && (
          <div className="clue-container">
            <div className="row">
              <div className="col m8 offset-m2 daily-double-col jeopardy-blue">
                <div className="row daily-double-row">
                  <div className="col m12">
                    <h2 className="jeopardy-white-text bold-text center-align">
                      Daily Double
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 offset-m3">
                    <button
                      onClick={this.display_wager_form}
                      className="btn btn-large btn-wide jeopardy-white bold-text jeopardy-blue-text btn-continue"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {display_daily_double_wager && (
          <div className="clue-container">
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
                {winnings < 1000 && (
                  <div className="row">
                    <div className="col m12">
                      <div className="current-winnings-heading center-align jeopardy-blue-dark-text bold-text">
                        You may wager up to{" "}
                        <span className="wager-span">$1,000</span>
                      </div>
                    </div>
                  </div>
                )}
                {winnings >= 1000 && (
                  <div className="row">
                    <div className="col m12">
                      <div className="current-winnings-heading center-align jeopardy-blue-dark-text bold-text">
                        You may wager up to{" "}
                        <span className="wager-span">
                          ${this.number_with_commas(winnings)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col m10 offset-m1">
                    <div className="row">
                      <div className="col m8 offset-m2">
                        <form noValidate>
                          <div className="currency-input-field">
                            <div className="input-field">
                              <CurrencyInput
                                id="daily_double_wager"
                                className="double-jeopardy-wager jeopardy-blue-dark-text"
                                prefix="$"
                                value={this.state.daily_double_wager}
                                onChangeEvent={this.on_change}
                              />
                              <label className="active jeopardy-blue-dark-text bold-text wager-label">
                                Wager
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col m6">
                              {/* Before the clue is revealed, the contestant who selects the Daily Double must declare a wager, from a minimum of $5 to a maximum of his/her entire score (known as a "true Daily Double") */}
                              {winnings < 5 ? (
                                <button
                                  onClick={this.handle_true_daily_double}
                                  className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-daily"
                                  disabled
                                >
                                  True Daily Double
                                </button>
                              ) : (
                                <button
                                  onClick={this.handle_true_daily_double}
                                  className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-daily"
                                >
                                  True Daily Double
                                </button>
                              )}
                            </div>
                            <div className="input-field col m6">
                              <button
                                onClick={this.handle_manual_wager}
                                className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-daily"
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
        {display_daily_double_question && (
          <div className="clue-container">
            <div className="row">
              <div className="col m8 offset-m2 clue-col jeopardy-blue">
                <div className="row clue-row">
                  <div className="col m12 center-align">
                    <div className="jeopardy-white-text output-size">
                      {this.display_question(question_obj)}
                    </div>
                  </div>
                </div>
                {display_answer == false && (
                  <div className="row reveal-button-row">
                    <div className="col m4 offset-m4 center-align">
                      <a
                        onClick={this.update_display_answer_state}
                        className="btn jeopardy-white jeopardy-blue-text bold-text btn-reveal"
                      >
                        <div>
                          <i className="material-icons left icon-margin">
                            lightbulb_outline
                          </i>
                          Reveal Answer
                        </div>
                      </a>
                    </div>
                  </div>
                )}
                {display_answer && (
                  <div>
                    <div className="row answer-row">
                      <div className="col m4 offset-m4 center-align">
                        <div className="jeopardy-white-text output-size answer-output">
                          {this.display_answer(question_obj)}
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
                        <div className="row determination-row">
                          <div className="col m6 center-align">
                            <a
                              onClick={() =>
                                this.answer_response(
                                  incorrect_daily_double,
                                  true
                                )
                              }
                              className="btn jeopardy-white jeopardy-red-text"
                            >
                              <i className="material-icons">highlight_off</i>
                            </a>
                          </div>
                          <div className="col m6 center-align">
                            <a
                              onClick={() =>
                                this.answer_response(
                                  correct_daily_double,
                                  false
                                )
                              }
                              className="btn jeopardy-white jeopardy-green-text"
                            >
                              <i className="material-icons">check</i>
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
        {display_question && (
          <div className="clue-container">
            <div className="row">
              <div className="col m8 offset-m2 clue-col jeopardy-blue">
                <div className="row clue-row">
                  <div className="col m12 center-align">
                    <div className="jeopardy-white-text output-size">
                      {this.display_question(question_obj)}
                    </div>
                  </div>
                </div>
                {display_answer == false && (
                  <div className="row reveal-button-row">
                    <div className="col m4 offset-m4 center-align">
                      <a
                        onClick={this.update_display_answer_state}
                        className="btn jeopardy-white jeopardy-blue-text bold-text btn-reveal"
                      >
                        <div>
                          <i className="material-icons left icon-margin">
                            lightbulb_outline
                          </i>
                          Reveal Answer
                        </div>
                      </a>
                    </div>
                  </div>
                )}
                {display_answer && (
                  <div>
                    <div className="row answer-row">
                      <div className="col m4 offset-m4 center-align">
                        <div className="jeopardy-white-text output-size answer-output">
                          {this.display_answer(question_obj)}
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
                        <div className="row determination-row">
                          <div className="col m6 center-align">
                            <a
                              onClick={() =>
                                this.answer_response(incorrect_response)
                              }
                              className="btn jeopardy-white jeopardy-red-text"
                            >
                              <i className="material-icons">highlight_off</i>
                            </a>
                          </div>
                          <div className="col m6 center-align">
                            <a
                              onClick={() =>
                                this.answer_response(correct_response)
                              }
                              className="btn jeopardy-white jeopardy-green-text"
                            >
                              <i className="material-icons">check</i>
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

Focus.propTypes = {
  answer_response: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps, {
  answer_response,
  display_wager_form,
  handle_daily_double_wager,
  handle_true_daily_double
})(withRouter(Focus));
