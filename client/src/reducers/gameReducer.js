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
  LOADING_NEW_GAME,
  ACTIVATING_GAME,
  RESET_GAME
} from "../actions/types";

const initial_state = {
  is_game_active: false,
  is_first_round: true,
  is_second_round: false,
  is_final_jeopardy: false,
  loading_round: true,
  first_round_categories: [],
  first_round_questions: [[], [], [], [], [], []],
  second_round_categories: [],
  second_round_questions: [[], [], [], [], [], []],
  daily_doubles: [],
  answered_questions: [],
  winnings: 0,
  display_daily_double_question: false,
  display_daily_double_wager: false,
  true_daily_double: false,
  final_jeopardy_question: {},
  display_final_jeopardy_question: false,
  display_final_jeopardy_wager: false,
  final_earnings: 0,
  loading_game_over: false,
  is_game_over: false,
  is_new_high_score: false,
  high_scores: [],
  is_new_game: true
};

export default function(state = initial_state, action) {
  const { type } = action;

  switch (type) {
    case LOADING_QUESTIONS: {
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      }
      var payload = action.payload;
      const { round, questions, question } = payload;

      if (round === 1) {
        let categories = questions.map(question => {
          try {
            var category = {
              id: question[0].category_id,
              title: question[0].category.title
            };
            return category;
          } catch (error) {
            console.log(error);
          }
        });

        /*
            Randomly Select Question for First Round's Daily Double
            Daily Doubles are usually hidden behind higher-valued questions, and almost never on the top row (only eight of the over 11,000 Daily Doubles since November 2001, 0.07%, have been in that location)
        */
        const daily_double_category = getRandomInt(1, 6);
        const daily_double_question = getRandomInt(1, 5);

        return {
          ...state,
          is_new_game: false,
          first_round_categories: categories,
          first_round_questions: questions,
          loading_round: false,
          daily_doubles: [
            ...state.daily_doubles,
            questions[daily_double_category][daily_double_question].id
          ]
        };
      } else if (round === 2) {
        let categories = questions.map(question => {
          try {
            var category = {
              id: question[0].category_id,
              title: question[0].category.title
            };
            return category;
          } catch (error) {
            console.log(error);
          }
        });
        /*
            Randomly Select Two Questions for Double Jeopardy Round's Daily Doubles
        */
        const daily_double_category_1 = getRandomInt(1, 6);
        const daily_double_question_1 = getRandomInt(1, 5);
        // It is conventional for categories to have no more than one Daily Double
        let daily_double_flag = true;
        let daily_double_category_2 = null;
        while (daily_double_flag) {
          daily_double_category_2 = getRandomInt(1, 6);
          if (daily_double_category_2 !== daily_double_category_1) {
            daily_double_flag = false;
          }
        }
        const daily_double_question_2 = getRandomInt(1, 5);
        // Randomly Select Two Questions for Second Round's Daily Doubles
        return {
          ...state,
          is_first_round: false,
          is_second_round: true,
          second_round_categories: categories,
          second_round_questions: questions,
          loading_round: false,
          daily_doubles: [
            ...state.daily_doubles,
            questions[daily_double_category_1][daily_double_question_1].id,
            questions[daily_double_category_2][daily_double_question_2].id
          ],
          answered_questions: []
        };
      } else if (round === 3) {
        return {
          ...state,
          is_second_round: false,
          is_final_jeopardy: true,
          loading_round: false,
          final_jeopardy_question: question
        };
      }
    }
    case RESPONSE_PROCESSED: {
      var payload = action.payload;
      const {
        question_id,
        value,
        response,
        answered_questions_length,
        is_daily_double
      } = payload;

      const {
        true_daily_double,
        is_first_round,
        is_second_round,
        is_final_jeopardy
      } = state;

      var { winnings } = state;

      if (answered_questions_length === 29) {
        if (is_daily_double) {
          if (true_daily_double) {
            if (response === "correct") {
              if (is_first_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings += winnings),
                  loading_round: true,
                  is_first_round: false,
                  is_second_round: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              } else if (is_second_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings += winnings),
                  loading_round: true,
                  is_second_round: false,
                  is_final_jeopardy: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              }
            } else {
              if (is_first_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: 0,
                  loading_round: true,
                  is_first_round: false,
                  is_second_round: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              } else if (is_second_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: 0,
                  loading_round: true,
                  is_second_round: false,
                  is_final_jeopardy: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              }
            }
          } else {
            if (response === "correct") {
              if (is_first_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings += value),
                  loading_round: true,
                  is_first_round: false,
                  is_second_round: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              } else if (is_second_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings += value),
                  loading_round: true,
                  is_second_round: false,
                  is_final_jeopardy: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              }
            } else {
              if (is_first_round) {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings -= value),
                  loading_round: true,
                  is_first_round: false,
                  is_second_round: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              } else {
                return {
                  ...state,
                  answered_questions: [
                    ...state.answered_questions,
                    question_id
                  ],
                  winnings: (winnings -= value),
                  loading_round: true,
                  is_second_round: false,
                  is_final_jeopardy: true,
                  daily_doubles: [],
                  display_daily_double_question: false,
                  true_daily_double: false
                };
              }
            }
          }
        } else {
          if (response === "correct") {
            if (is_first_round) {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: (winnings += value),
                loading_round: true,
                is_first_round: false,
                is_second_round: true,
                daily_doubles: []
              };
            } else if (is_second_round) {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: (winnings += value),
                loading_round: true,
                is_second_round: false,
                is_final_jeopardy: true,
                daily_doubles: []
              };
            }
          } else {
            if (is_first_round) {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                loading_round: true,
                is_first_round: false,
                is_second_round: true,
                daily_doubles: []
              };
            } else if (is_second_round) {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                loading_round: true,
                is_second_round: false,
                is_final_jeopardy: true,
                daily_doubles: []
              };
            }
          }
        }
      } else {
        if (is_daily_double) {
          if (true_daily_double) {
            if (response === "correct") {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: (winnings += winnings),
                display_daily_double_question: false,
                true_daily_double: false
              };
            } else {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: 0,
                display_daily_double_question: false,
                true_daily_double: false
              };
            }
          } else {
            if (response === "correct") {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: (winnings += value),
                display_daily_double_question: false,
                true_daily_double: false
              };
            } else {
              return {
                ...state,
                answered_questions: [...state.answered_questions, question_id],
                winnings: (winnings -= value),
                display_daily_double_question: false,
                true_daily_double: false
              };
            }
          }
        } else {
          if (response === "correct") {
            return {
              ...state,
              answered_questions: [...state.answered_questions, question_id],
              winnings: (winnings += value)
            };
          } else {
            return {
              ...state,
              answered_questions: [...state.answered_questions, question_id]
            };
          }
        }
      }
    }
    case DISPLAY_WAGER_FORM: {
      return {
        ...state,
        display_daily_double_wager: true
      };
    }
    case DISPLAY_DAILY_DOUBLE: {
      return {
        ...state,
        display_daily_double_question: true,
        display_daily_double_wager: false
      };
    }
    case DISPLAY_TRUE_DAILY_DOUBLE: {
      return {
        ...state,
        display_daily_double_question: true,
        display_daily_double_wager: false,
        true_daily_double: true
      };
    }
    case DISPLAY_FINAL_JEOPARDY: {
      return {
        ...state,
        display_final_jeopardy_question: true,
        display_final_jeopardy_wager: false
      };
    }
    case PROCESS_FINAL: {
      const { response, final_jeopardy_wager } = action;
      if (response === "correct") {
        let final = (state.winnings += final_jeopardy_wager);
        return {
          ...state,
          is_final_jeopardy: false,
          final_earnings: final,
          loading_game_over: true,
          loading_round: false
        };
      } else {
        let final = (state.winnings -= final_jeopardy_wager);
        return {
          ...state,
          is_final_jeopardy: false,
          final_earnings: final,
          loading_game_over: true,
          loading_round: false
        };
      }
    }
    case GAME_OVER: {
      return {
        ...state,
        loading_game_over: false,
        is_game_over: true
      };
    }
    case ACTIVATING_GAME: {
      return {
        ...state,
        is_game_active: true
      };
    }
    case NEW_HIGH_SCORE: {
      const { high_scores } = action;
      return {
        ...state,
        loading_game_over: false,
        is_new_high_score: true,
        high_scores
      };
    }
    case RESET_GAME: {
      return {
        is_game_active: false,
        is_first_round: true,
        is_second_round: false,
        is_final_jeopardy: false,
        loading_round: true,
        first_round_categories: [],
        first_round_questions: [[], [], [], [], [], []],
        second_round_categories: [],
        second_round_questions: [[], [], [], [], [], []],
        daily_doubles: [],
        answered_questions: [],
        winnings: 0,
        display_daily_double_question: false,
        display_daily_double_wager: false,
        true_daily_double: false,
        final_jeopardy_question: {},
        display_final_jeopardy_question: false,
        display_final_jeopardy_wager: false,
        final_earnings: 0,
        loading_game_over: false,
        is_game_over: false,
        is_new_high_score: false,
        high_scores: [],
        is_new_game: true
      };
    }
    default:
      return state;
  }
}
