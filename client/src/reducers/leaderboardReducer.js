import { LEADERBOARD_LOADED } from "../actions/types";

const initial_state = {
  loading_leaderboard: true,
  leaders: []
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case LEADERBOARD_LOADED:
      return {
        loading_leaderboard: false,
        leaders: payload
      };
    default:
      return state;
  }
}
