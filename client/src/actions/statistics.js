import axios from "axios";
import { ACTIVE_STATISTICS_LOADED, PLAYER_STATISTICS_LOADED, STATISTICS_CLEARED } from "./types";

export const get_active_statistics = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/api/statistics/active");
    dispatch({
      type: ACTIVE_STATISTICS_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const get_player_statistics = (user_id) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/statistics/player/${user_id}`);

    dispatch({
      type: PLAYER_STATISTICS_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
}

export const clear_player_statistics = () => async dispatch => {
  try {
    dispatch({
      type: STATISTICS_CLEARED
    });
  } catch (error) {
    console.log(error.message);
  }
}