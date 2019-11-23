import axios from "axios";
import { show_alert } from "../actions/alert";
import {
  PROFILE_DELETED,
  ACCOUNT_DELETED,
  ACTIVE_PROFILE_CLEARED
} from "./types";

export const delete_profile = history => async dispatch => {
  try {
    const res = await axios.delete("/api/settings/delete-profile");
    dispatch({ type: PROFILE_DELETED });
    dispatch({ type: ACTIVE_PROFILE_CLEARED });
    history.push("/");
    dispatch(show_alert("Profile successfully deleted", "success"));
  } catch (error) {
    console.log(error);
    dispatch(show_alert("Profile deletion failed", "error"));
  }
};

export const delete_account = history => async dispatch => {
  try {
    let res = await axios.delete("/api/settings/delete-profile");
    dispatch({ type: PROFILE_DELETED });
    dispatch({ type: ACTIVE_PROFILE_CLEARED });
    res = await axios.delete("/api/settings/delete-account");
    dispatch({ type: ACCOUNT_DELETED });
    history.push("/");
    dispatch(show_alert("Account successfully deleted", "success"));
  } catch (error) {
    dispatch(show_alert("Account deletion failed", "error"));
  }
};
