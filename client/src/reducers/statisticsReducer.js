import {
  ACTIVE_STATISTICS_LOADED,
  PLAYER_STATISTICS_LOADED,
  STATISTICS_CLEARED
} from "../actions/types";

const initial_state = {
  loading_statistics: true,
  games_played: null,
  correct_responses: null,
  incorrect_responses: null,
  career_earnings: null
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIVE_STATISTICS_LOADED: {
      const {
        games_played,
        correct_responses,
        incorrect_responses,
        career_earnings
      } = payload;
      return {
        loading_statistics: false,
        games_played,
        correct_responses,
        incorrect_responses,
        career_earnings
      };
    }
    case PLAYER_STATISTICS_LOADED: {
      const {
        games_played,
        correct_responses,
        incorrect_responses,
        career_earnings
      } = payload;
      return {
        loading_statistics: false,
        games_played,
        correct_responses,
        incorrect_responses,
        career_earnings
      };
    }
    case STATISTICS_CLEARED: {
      return {
        loading_statistics: true,
        games_played: null,
        correct_responses: null,
        incorrect_responses: null,
        career_earnings: null
      };
    }
    default:
      return state;
  }
}
