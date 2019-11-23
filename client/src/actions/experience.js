import axios from "axios";
import { set_alert } from "../actions/alert";
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

    const res = await axios.post(
      "/api/experience/create",
      form_data,
      config
    );

    dispatch(set_alert("success", "New experience record created"));

    history.push("/profile");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(set_alert("error", error.msg)));
    } else {
      dispatch(set_alert("error", "Failed to create new exerience record"));
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

    dispatch(set_alert("success", "Experience record updated"));

    history.push("/update-profile");
  } catch (error) {
    dispatch(set_alert("error", "Failed to update item"));
  }
};

export const delete_experience = experience_id => async dispatch => {
  try {
    var res = await axios.delete(
      `/api/experience/${experience_id}/delete`
    );

    res = await axios.get(
      "/api/experience/get-experience"
    );

    dispatch({
      type: EXPERIENCE_DELETED,
      payload: res.data
    });

    dispatch(set_alert("success", "Experience record deleted"));
  } catch (error) {
    dispatch(set_alert("error", "Failed to delete experience"));
  }
};

export const get_active_experience = () => async dispatch => {
  try {
    let res = await axios.get(
      "/api/experience/get-experience"
    );
    dispatch({
      type: EXPERIENCE_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
    dispatch(set_alert("error", "Failed to get profile experience"));
  }
};

export const get_player_experience = profile_id => async dispatch => {
  try {
    let res = await axios.get(
      `/api/experience/get-experience/${profile_id}`
    );
    dispatch({
      type: EXPERIENCE_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
    dispatch(set_alert("error", "Failed to get player experience"));
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
    dispatch(set_alert("error", "Failed to delete item"));
  }
};
