import axios from "axios";
import { set_alert } from "../actions/alert";
import { PROFILE_DELETED, ACCOUNT_DELETED, ACTIVE_PROFILE_CLEARED } from "./types";

export const delete_profile = (history) => async dispatch => {
    try {
        const res = await axios.delete("http://localhost:5000/api/settings/delete-profile");
        dispatch({ type: PROFILE_DELETED });
        dispatch({ type: ACTIVE_PROFILE_CLEARED });
        history.push("/");
        dispatch(set_alert("success", "Your profile has been deleted"));
    } catch (error) {
        console.log(error)
        dispatch(set_alert("error", "Failed to delete profile"));
    }
};


export const delete_account = history => async dispatch => {
  try {
    let res = await axios.delete("http://localhost:5000/api/settings/delete-profile");
    dispatch({ type: PROFILE_DELETED });
    dispatch({ type: ACTIVE_PROFILE_CLEARED });
    res = await axios.delete("http://localhost:5000/api/settings/delete-account");
    dispatch({ type: ACCOUNT_DELETED });
    history.push("/");
    dispatch(set_alert("success", "Your account and profile has been deleted"));
  } catch (error) {
    dispatch(set_alert("error", "Failed to delete account"));
  }
};
