import axios from "axios";
import { LEADERBOARD_LOADED } from "./types";

export const get_leaders = () => async dispatch => {
  try {
    let res = await axios.get(
      "http://localhost:5000/api/score/get-high-scores"
    );

    const high_scores = res.data;

    const get_leaderboard = async high_scores => {
      let leaderboard = [];
      for await (const high_score of high_scores) {
        let leaderboard_obj = {};
        leaderboard_obj.user_id = high_score.user_id;
        leaderboard_obj.score = high_score.score;
        let res = await axios.get(
          `http://localhost:5000/api/auth/${high_score.user_id}`
        );
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
