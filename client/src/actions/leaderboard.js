import axios from "axios";
import { LEADERBOARD_LOADED, LEADERBOARD_CLEARED } from "./types";

export const get_leaderboard = () => async dispatch => {
  try {
    let res = await axios.get("/api/score/get-leaderboard");

    let high_scores = res.data;

    const get_leaderboard = async high_scores => {
      let leaderboard = [];
      for await (const high_score of high_scores) {
        let leaderboard_obj = {};
        leaderboard_obj.score_id = high_score._id;
        leaderboard_obj.user_id = high_score.user_id;
        leaderboard_obj.score = high_score.score;
        let res = await axios.get(`/api/auth/${high_score.user_id}`);
        leaderboard_obj.name = `${res.data.first_name} ${res.data.last_name}`;
        leaderboard.push(leaderboard_obj);
      }
      return leaderboard;
    };

    const leaderboard = await get_leaderboard(high_scores);

    dispatch({
      type: LEADERBOARD_LOADED,
      payload: leaderboard
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const clear_leaderboard = () => async dispatch => {
  try {
    dispatch({
      type: LEADERBOARD_CLEARED
    });
  } catch (error) {
    console.log(error.message);
  }
};
