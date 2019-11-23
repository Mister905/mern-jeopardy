import axios from "axios";
import { show_alert } from "../actions/alert";
import {
  EXPERIENCE_ITEM_LOADED,
  EXPERIENCE_LOADED,
  EXPERIENCE_DELETED
} from "./types";

export const create_experience = (form_data, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/experience/create", form_data, config);

    dispatch(show_alert("New experience record created", "success"));

    history.push("/profile");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(show_alert(error.msg, "error")));
    } else {
      dispatch(show_alert("Failed to create new exerience record", "error"));
    }
  }
};

export const update_experience = (experience, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const exp_id = experience.exp_id;

    const res = await axios.put(
      `/api/experience/${exp_id}/update`,
      experience,
      config
    );

    dispatch(show_alert("Experience record updated", "success"));

    history.push("/update-profile");
  } catch (error) {
    dispatch(show_alert("Failed to update experience record", "error"));
  }
};

export const delete_experience = experience_id => async dispatch => {
  try {
    var res = await axios.delete(`/api/experience/${experience_id}/delete`);

    res = await axios.get("/api/experience/get-experience");

    dispatch({
      type: EXPERIENCE_DELETED,
      payload: res.data
    });

    dispatch(show_alert("Experience record deleted", "success"));
  } catch (error) {
    dispatch(show_alert("Failed to delete experience record", "error"));
  }
};

export const get_active_experience = () => async dispatch => {
  try {
    let res = await axios.get("/api/experience/get-experience");
    dispatch({
      type: EXPERIENCE_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch(show_alert("Failed to get experience records", "error"));
  }
};

export const get_player_experience = profile_id => async dispatch => {
  try {
    let res = await axios.get(`/api/experience/get-experience/${profile_id}`);
    dispatch({
      type: EXPERIENCE_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch(show_alert("Failed to get experience records", "error"));
  }
};

export const get_experience_item = exp_id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/experience/get-experience-item/${exp_id}`
    );
    dispatch({
      type: EXPERIENCE_ITEM_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch(show_alert("Failed to delete experience record", "error"));
  }
};
