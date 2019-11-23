import axios from "axios";
import { show_alert } from "../actions/alert";
import {
  LOADING_QUESTIONS,
  RESPONSE_PROCESSED,
  DISPLAY_WAGER_FORM,
  DISPLAY_DAILY_DOUBLE,
  DISPLAY_TRUE_DAILY_DOUBLE,
  GAME_OVER,
  DISPLAY_FINAL_JEOPARDY,
  PROCESS_FINAL,
  NEW_HIGH_SCORE,
  RESET_GAME,
  ACTIVATING_GAME
} from "./types";

export const activate_game = () => async dispatch => {
  dispatch({
    type: ACTIVATING_GAME
  });
};

export const load_round = game_data => async dispatch => {
  const { round } = game_data;

  if (round === 1) {
    let getting_unique_categories = true;

    let questions = [[], [], [], [], [], []];

    let index_counter = 0;

    while (getting_unique_categories) {
      try {
        // console.log("getting_unique_categories");
        let res = await axios.get("/api/game/get-random-questions");

        res = JSON.parse(res.data);

        let categories = res.data.map(category => {
          return category.category_id;
        });

        for (let i = 0; i < categories.length; i++) {
          let is_valid = true;
          // console.log(`Category Counter: ${i}`);
          if (index_counter <= 5) {
            const category_id = categories[i];

            let res_200 = null;

            try {
              res_200 = await axios({
                method: "get",
                url: "/api/game/get-question",
                params: {
                  value: 200,
                  category_id: category_id
                }
              });

              res_200 = res_200.data;

              if (res_200.length === 0) {
                // console.log("Empty 200 Response");
                continue;
              }
            } catch (error) {
              console.log(error);
            }

            let res_400 = null;
            try {
              res_400 = await axios({
                method: "get",
                url: "/api/game/get-question",
                params: {
                  value: 400,
                  category_id: category_id
                }
              });

              res_400 = res_400.data;

              if (res_400.length === 0) {
                // console.log("Empty 400 Response");
                continue;
              }
            } catch (error) {
              console.log(error);
            }

            let res_600 = null;
            try {
              res_600 = await axios({
                method: "get",
                url: "/api/game/get-question",
                params: {
                  value: 600,
                  category_id: category_id
                }
              });

              res_600 = res_600.data;

              if (res_600.length === 0) {
                // console.log("Empty 600 Response");
                continue;
              }
            } catch (error) {
              console.log(error);
            }

            let res_800 = null;
            try {
              res_800 = await axios({
                method: "get",
                url: "/api/game/get-question",
                params: {
                  value: 800,
                  category_id: category_id
                }
              });

              res_800 = res_800.data;

              if (res_800.length === 0) {
                // console.log("Empty 800 Response");
                continue;
              }
            } catch (error) {
              console.log(error);
            }

            let res_1000 = null;
            try {
              res_1000 = await axios({
                method: "get",
                url: "/api/game/get-question",
                params: {
                  value: 1000,
                  category_id: category_id
                }
              });

              res_1000 = res_1000.data;

              if (res_1000.length === 0) {
                // console.log("Empty 1000 Response");
                continue;
              }
            } catch (error) {
              console.log(error);
            }

            // console.log(`Index Count: ${index_counter}`);

            let prospective_category_id = res_400[0].category_id;

            switch (index_counter) {
              case 0:
                // console.log("questions[0] valid");
                questions[0].push(res_200[0]);
                questions[0].push(res_400[0]);
                questions[0].push(res_600[0]);
                questions[0].push(res_800[0]);
                questions[0].push(res_1000[0]);
                // console.log(questions);
                index_counter++;
                break;
              case 1:
                prospective_category_id = res_200[0].category_id;
                for (let i = 0; i < index_counter; i++) {
                  const category_column = questions[i];
                  if (
                    category_column[0].category_id === prospective_category_id
                  ) {
                    // console.log("Category Not Unique");
                    is_valid = false;
                    break;
                  }
                }
                if (is_valid) {
                  // console.log("questions[1] valid");
                  questions[1].push(res_200[0]);
                  questions[1].push(res_400[0]);
                  questions[1].push(res_600[0]);
                  questions[1].push(res_800[0]);
                  questions[1].push(res_1000[0]);
                  // console.log(questions);
                  index_counter++;
                  break;
                } else {
                  break;
                }
              case 2:
                prospective_category_id = res_200[0].category_id;
                for (let i = 0; i < index_counter; i++) {
                  const category_column = questions[i];
                  if (
                    category_column[0].category_id === prospective_category_id
                  ) {
                    // console.log("Category Not Unique");
                    is_valid = false;
                    break;
                  }
                }
                if (is_valid) {
                  // console.log("questions[2] valid");
                  questions[2].push(res_200[0]);
                  questions[2].push(res_400[0]);
                  questions[2].push(res_600[0]);
                  questions[2].push(res_800[0]);
                  questions[2].push(res_1000[0]);
                  // console.log(questions);
                  index_counter++;
                  break;
                } else {
                  break;
                }
              case 3:
                prospective_category_id = res_200[0].category_id;
                for (let i = 0; i < index_counter; i++) {
                  const category_column = questions[i];
                  if (
                    category_column[0].category_id === prospective_category_id
                  ) {
                    // console.log("Category Not Unique");
                    is_valid = false;
                    break;
                  }
                }
                if (is_valid) {
                  // console.log("questions[3] valid");
                  questions[3].push(res_200[0]);
                  questions[3].push(res_400[0]);
                  questions[3].push(res_600[0]);
                  questions[3].push(res_800[0]);
                  questions[3].push(res_1000[0]);
                  // console.log(questions);
                  index_counter++;
                  break;
                } else {
                  break;
                }
              case 4:
                prospective_category_id = res_200[0].category_id;
                for (let i = 0; i < index_counter; i++) {
                  const category_column = questions[i];
                  if (
                    category_column[0].category_id === prospective_category_id
                  ) {
                    // console.log("Category Not Unique");
                    is_valid = false;
                    break;
                  }
                }
                if (is_valid) {
                  // console.log("questions[4] valid");
                  questions[4].push(res_200[0]);
                  questions[4].push(res_400[0]);
                  questions[4].push(res_600[0]);
                  questions[4].push(res_800[0]);
                  questions[4].push(res_1000[0]);
                  // console.log(questions);
                  index_counter++;
                  break;
                } else {
                  break;
                }

              case 5:
                prospective_category_id = res_200[0].category_id;
                for (let i = 0; i < index_counter; i++) {
                  const category_column = questions[i];
                  if (
                    category_column[0].category_id === prospective_category_id
                  ) {
                    // console.log("Category Not Unique");
                    is_valid = false;
                    break;
                  }
                }
                if (is_valid) {
                  // console.log("questions[5] valid");
                  questions[5].push(res_200[0]);
                  questions[5].push(res_400[0]);
                  questions[5].push(res_600[0]);
                  questions[5].push(res_800[0]);
                  questions[5].push(res_1000[0]);
                  // console.log(questions);
                  index_counter++;
                  break;
                } else {
                  break;
                }
            }
          } else {
            break;
          }
        }

        if (index_counter == 6) {
          // console.log("Round 1 Questions Loaded");
          // console.log(questions);
          getting_unique_categories = false;
        }
      } catch (error) {
        console.log(error);
      }
    }

    const payload = {
      round,
      questions
    };

    dispatch({
      type: LOADING_QUESTIONS,
      payload
    });
  } else if (round === 2) {
    let getting_unique_categories = true;

    let categories = null;

    let questions = [[], [], [], [], [], []];

    let index_counter = 0;

    while (getting_unique_categories) {
      try {
        const { first_round_categories } = game_data;

        let res = await axios.get("/api/game/get-random-questions");

        res = JSON.parse(res.data);

        categories = res.data.map(category => {
          return category.category_id;
        });

        for (let i = 0; i < categories.length; i++) {
          // console.log(`Category Counter: ${i}`);
          let is_valid = true;
          if (index_counter <= 5) {
            const category_id = categories[i];

            /* 
                jService API does not have questions with values that correspond to 
                second round values - therefore the first round values are substituted 
                e.g. 400 value question comes from 200 value request
            */

            let res_400 = null;

            try {
              res_400 = await axios({
                method: "get",
                url: "/api/game/get-question",
                params: {
                  value: 200,
                  category_id: category_id
                }
              });

              res_400 = res_400.data;

              if (res_400.length === 0) {
                // console.log("Empty 400 Response");
                continue;
              }
              if (first_round_categories.includes(res_400[0].category_id)) {
                // console.log("Category Not Unique");
                continue;
              }
            } catch (error) {
              console.log(error);
            }

            let res_800 = null;

            try {
              res_800 = await axios({
                method: "get",
                url: "/api/game/get-question",
                params: {
                  value: 400,
                  category_id: category_id
                }
              });

              res_800 = res_800.data;

              if (res_800.length === 0) {
                // console.log("Empty 800 Response");
                continue;
              }
              if (first_round_categories.includes(res_800[0].category_id)) {
                // console.log("Category Not Unique");
                continue;
              }
            } catch (error) {
              console.log(error);
            }

            let res_1200 = null;

            try {
              res_1200 = await axios({
                method: "get",
                url: "/api/game/get-question",
                params: {
                  value: 600,
                  category_id: category_id
                }
              });

              res_1200 = res_1200.data;

              if (res_1200.length === 0) {
                // console.log("Empty 1200 Response");
                continue;
              }
              if (first_round_categories.includes(res_1200[0].category_id)) {
                // console.log("Category Not Unique");
                continue;
              }
            } catch (error) {
              console.log(error);
            }

            let res_1600 = null;

            try {
              res_1600 = await axios({
                method: "get",
                url: "/api/game/get-question",
                params: {
                  value: 800,
                  category_id: category_id
                }
              });

              res_1600 = res_1600.data;

              if (res_1600.length === 0) {
                // console.log("Empty 1600 Response");
                continue;
              }
              if (first_round_categories.includes(res_1600[0].category_id)) {
                // console.log("Category Not Unique");
                continue;
              }
            } catch (error) {
              console.log(error);
            }

            let res_2000 = null;

            try {
              res_2000 = await axios({
                method: "get",
                url: "/api/game/get-question",
                params: {
                  value: 1000,
                  category_id: category_id
                }
              });

              res_2000 = res_2000.data;

              if (res_2000.length === 0) {
                // console.log("Empty 1600 Response");
                continue;
              }
              if (first_round_categories.includes(res_2000[0].category_id)) {
                // console.log("Category Not Unique");
                continue;
              }
            } catch (error) {
              console.log(error);
            }

            // console.log(`Index Count: ${index_counter}`);

            let prospective_category_id = res_400[0].category_id;

            switch (index_counter) {
              case 0:
                if (prospective_category_id) {
                  for (let i = 0; i < index_counter; i++) {
                    const category_column = questions[i];
                    if (
                      category_column[0].category_id === prospective_category_id
                    ) {
                      // console.log("Category Not Unique");
                      is_valid = false;
                      break;
                    }
                  }
                  if (is_valid) {
                    // console.log("questions[0] valid");
                    questions[0].push(res_400[0]);
                    questions[0].push(res_800[0]);
                    questions[0].push(res_1200[0]);
                    questions[0].push(res_1600[0]);
                    questions[0].push(res_2000[0]);
                    // console.log(questions);
                    index_counter++;
                    break;
                  } else {
                    break;
                  }
                } else {
                  break;
                }
              case 1:
                if (prospective_category_id) {
                  for (let i = 0; i < index_counter; i++) {
                    const category_column = questions[i];
                    if (
                      category_column[0].category_id === prospective_category_id
                    ) {
                      // console.log("Category Not Unique");
                      is_valid = false;
                      break;
                    }
                  }
                  if (is_valid) {
                    // console.log("questions[1] valid");
                    questions[1].push(res_400[0]);
                    questions[1].push(res_800[0]);
                    questions[1].push(res_1200[0]);
                    questions[1].push(res_1600[0]);
                    questions[1].push(res_2000[0]);
                    // console.log(questions);
                    index_counter++;
                    break;
                  } else {
                    break;
                  }
                } else {
                  break;
                }
              case 2:
                if (prospective_category_id) {
                  for (let i = 0; i < index_counter; i++) {
                    const category_column = questions[i];
                    if (
                      category_column[0].category_id === prospective_category_id
                    ) {
                      // console.log("Category Not Unique");
                      is_valid = false;
                      break;
                    }
                  }
                  if (is_valid) {
                    // console.log("questions[2] valid");
                    questions[2].push(res_400[0]);
                    questions[2].push(res_800[0]);
                    questions[2].push(res_1200[0]);
                    questions[2].push(res_1600[0]);
                    questions[2].push(res_2000[0]);
                    // console.log(questions);
                    index_counter++;
                    break;
                  } else {
                    break;
                  }
                } else {
                  break;
                }
              case 3:
                if (prospective_category_id) {
                  for (let i = 0; i < index_counter; i++) {
                    const category_column = questions[i];
                    if (
                      category_column[0].category_id === prospective_category_id
                    ) {
                      // console.log("Category Not Unique");
                      is_valid = false;
                      break;
                    }
                  }
                  if (is_valid) {
                    // console.log("questions[3] valid");
                    questions[3].push(res_400[0]);
                    questions[3].push(res_800[0]);
                    questions[3].push(res_1200[0]);
                    questions[3].push(res_1600[0]);
                    questions[3].push(res_2000[0]);
                    // console.log(questions);
                    index_counter++;
                    break;
                  } else {
                    break;
                  }
                } else {
                  break;
                }
              case 4:
                if (prospective_category_id) {
                  for (let i = 0; i < index_counter; i++) {
                    const category_column = questions[i];
                    if (
                      category_column[0].category_id === prospective_category_id
                    ) {
                      // console.log("Category Not Unique");
                      is_valid = false;
                      break;
                    }
                  }
                  if (is_valid) {
                    // console.log("questions[4] valid");
                    questions[4].push(res_400[0]);
                    questions[4].push(res_800[0]);
                    questions[4].push(res_1200[0]);
                    questions[4].push(res_1600[0]);
                    questions[4].push(res_2000[0]);
                    // console.log(questions);
                    index_counter++;
                    break;
                  } else {
                    break;
                  }
                } else {
                  break;
                }

              case 5:
                if (prospective_category_id) {
                  for (let i = 0; i < index_counter; i++) {
                    const category_column = questions[i];
                    if (
                      category_column[0].category_id === prospective_category_id
                    ) {
                      // console.log("Category Not Unique");
                      is_valid = false;
                      break;
                    }
                  }
                  if (is_valid) {
                    // console.log("questions[5] valid");
                    questions[5].push(res_400[0]);
                    questions[5].push(res_800[0]);
                    questions[5].push(res_1200[0]);
                    questions[5].push(res_1600[0]);
                    questions[5].push(res_2000[0]);
                    // console.log(questions);
                    index_counter++;
                    break;
                  } else {
                    break;
                  }
                } else {
                  break;
                }
            }
          } else {
            break;
          }
        }

        if (index_counter == 6) {
          // console.log("Round 2 Questions Loaded");
          // console.log(questions);
          getting_unique_categories = false;
        }
      } catch (error) {
        console.log(error);
      }
    }

    const payload = {
      round,
      questions
    };

    dispatch({
      type: LOADING_QUESTIONS,
      payload
    });
  } else if (round === 3) {
    try {
      const { first_round_categories } = game_data;

      const { second_round_categories } = game_data;

      let res = await axios.get("/api/game/get-random-questions");

      res = JSON.parse(res.data);

      let categories = res.data.map(category => {
        return category.category_id;
      });

      let question = null;

      for (let i = 0; i < categories.length; i++) {
        let is_valid = true;

        const category_id = categories[i];

        let res_final = await axios({
          method: "get",
          url: "/api/game/get-question",
          params: {
            value: 1000,
            category_id: category_id
          }
        });

        res_final = res_final.data;

        if (
          res_final.length === 0 ||
          first_round_categories.includes(res_final[0].category_id) ||
          second_round_categories.includes(res_final[0].category_id)
        ) {
          continue;
        }

        if (is_valid) {
          question = res_final[0];
          break;
        }
      }

      const payload = {
        round,
        question
      };

      dispatch({
        type: LOADING_QUESTIONS,
        payload
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const answer_response = (response, history) => async dispatch => {
  const res = await axios.post("/api/statistics/response", response);

  const payload = {
    question_id: response.question_id,
    response: response.response,
    value: response.value,
    answered_questions_length: response.answered_questions_length,
    is_daily_double: response.is_daily_double,
    correct_daily_double: response.correct_daily_double,
    incorrect_daily_double: response.incorrect_daily_double
  };

  dispatch({
    type: RESPONSE_PROCESSED,
    payload
  });

  history.push("/game");
};

export const display_wager_form = () => async dispatch => {
  dispatch({
    type: DISPLAY_WAGER_FORM
  });
};

const number_with_commas = x => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const handle_daily_double_wager = (
  daily_double_wager,
  winnings
) => async dispatch => {
  if (daily_double_wager < 5) {
    dispatch(show_alert("The minimum Daily Double wager is $5", "error"));
  } else if (winnings > 1000 && daily_double_wager > winnings) {
    dispatch(
      show_alert(
        `Invalid wager - You may wager up to $${this.number_with_commas(
          winnings
        )}`,
        "error"
      )
    );
  } else if (winnings < 1000 && daily_double_wager > 1000) {
    dispatch(show_alert("Invalid wager - You may wager up to $1,000", "error"));
  } else {
    dispatch({
      type: DISPLAY_DAILY_DOUBLE
    });
  }
};

export const handle_true_daily_double = true_daily_double => async dispatch => {
  if (true_daily_double < 5) {
    dispatch(show_alert("The minimum Daily Double wager is $5", "error"))
  } else {
    dispatch({
      type: DISPLAY_TRUE_DAILY_DOUBLE
    });
  }
};

export const handle_final_jeopardy_wager = (
  final_jeopardy_wager,
  winnings
) => async dispatch => {
  if (final_jeopardy_wager > winnings) {

    dispatch(show_alert(`You may wager up to $${this.number_with_commas(winnings)}`, "error"));
  } else {
    dispatch({
      type: DISPLAY_FINAL_JEOPARDY
    });
  }
};

export const handle_all_in = () => async dispatch => {
  dispatch({
    type: DISPLAY_FINAL_JEOPARDY
  });
};

export const final_jeopardy_response = (
  response,
  final_jeopardy_wager
) => async dispatch => {
  dispatch({
    type: PROCESS_FINAL,
    response,
    final_jeopardy_wager
  });
};

export const load_game_over = payload => async dispatch => {
  await axios.post("/api/statistics/game-over", payload);
  var new_score = await axios.post("/api/score/new-score", payload);
  new_score = new_score.data;
  const score_id = new_score._id;
  let high_scores = await axios.get("/api/score/get-high-scores");
  high_scores = high_scores.data;
  let new_high_score_flag = false;
  for (let i = 0; i < high_scores.length; i++) {
    const score = high_scores[i];
    if (score._id === score_id) {
      new_high_score_flag = true;
      dispatch({
        type: NEW_HIGH_SCORE,
        high_scores
      });
    }
  }
  if (new_high_score_flag == false) {
    dispatch({
      type: GAME_OVER
    });
  }
};

export const reset_game = () => async dispatch => {
  dispatch({
    type: RESET_GAME
  });
};
