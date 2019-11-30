import { LEADERBOARD_LOADED, LEADERBOARD_CLEARED, NEW_HIGH_SCORE_ID_SET } from "../actions/types";

const initial_state = {
  loading_leaderboard: true,
  leaderboard: [],
  new_high_score_id: null
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case LEADERBOARD_LOADED:
      return {
        ...state,
        loading_leaderboard: false,
        leaderboard: payload
      };
    case LEADERBOARD_CLEARED:
      return {
        ...state,
        loading_leaderboard: true,
        leaderboard: []
      };
    case NEW_HIGH_SCORE_ID_SET:
      return {
        ...state,
        new_high_score_id: payload
      }
    default:
      return state;
  }
}
