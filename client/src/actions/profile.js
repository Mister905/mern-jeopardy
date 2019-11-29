import axios from "axios";
import { show_alert } from "../actions/alert";
import {
  ACTIVE_PROFILE_LOADED,
  ACTIVE_PROFILE_CLEARED,
  ALL_PROFILES_LOADED,
  PLAYER_NAME_LOADED,
  PLAYER_PROFILE_LOADED,
  PLAYER_PROFILE_CLEARED,
  ACTIVE_EXPERIENCE_CLEARED,
  PLAYER_EXPERIENCE_CLEARED,
  UPDATE_FORM_LOADED
} from "./types";

// Get Active User's Profile
export const get_active_profile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/active");
    dispatch({
      type: ACTIVE_PROFILE_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const get_profiles = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/all");

    const profiles = res.data;

    const get_users = async profiles => {
      let users = [];
      for await (const profile of profiles) {
        let user_obj = {};
        user_obj.profile_id = profile._id;
        let res = await axios.get(`/api/auth/${profile.user._id}`);
        user_obj.name = `${res.data.first_name} ${res.data.last_name}`;
        users.push(user_obj);
      }
      return users;
    };

    let users = await get_users(profiles);

    dispatch({
      type: ALL_PROFILES_LOADED,
      payload: users
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_profile_by_profile_id = profile_id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/profile/get_profile_by_profile_id/${profile_id}`
    );
    dispatch({
      type: PLAYER_PROFILE_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_profile_by_user_id = user_id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/profile/get_profile_by_user_id/${user_id}`
    );
    dispatch({
      type: PLAYER_PROFILE_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_player_name = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/auth/${user_id}`);
    dispatch({
      type: PLAYER_NAME_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const create_profile = (form_data, history) => async dispatch => {
  try {
    const { biography } = form_data;

    if (biography) {
      // File upload size validation
      if (form_data.profile_image) {
        const { profile_image } = form_data;
        const file_size = profile_image.size / 1024 / 1024; // in MB
        if (file_size > 2) {
          dispatch(show_alert("File size exceeds 2 MB", "error"));
        }
      }

      const form_data_object = Object.keys(form_data).reduce((f, k) => {
        f.append(k, form_data[k]);
        return f;
      }, new FormData());

      const res = await axios.post("/api/profile/create", form_data_object);

      dispatch({
        type: ACTIVE_PROFILE_LOADED,
        payload: res.data
      });

      dispatch(show_alert("Profile creation successful", "success"));

      history.push("/dashboard");
    } else {
      dispatch(show_alert("Biography is a required field", "error"));
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(show_alert(error.msg, "error")));
    } else {
      dispatch(show_alert("Login error", "error"));
    }
  }
};

export const update_profile = (form_data, history) => async dispatch => {
  try {
    const { biography } = form_data;

    if (biography) {
      // File upload size validation
      if (form_data.profile_image) {
        const { profile_image } = form_data;
        const file_size = profile_image.size / 1024 / 1024; // in MB
        if (file_size > 2) {
          dispatch(show_alert("File size exceeds 2 MB", "error"));
        }
      }

      const form_data_object = Object.keys(form_data).reduce((f, k) => {
        f.append(k, form_data[k]);
        return f;
      }, new FormData());

      const res = await axios.post("/api/profile/update", form_data_object);

      dispatch({
        type: ACTIVE_PROFILE_LOADED,
        payload: res.data
      });

      dispatch(show_alert("Profile successfully updated", "success"));

      history.push("/profile");
    } else {
      dispatch(show_alert("Biography is a required field", "error"));
    }
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(show_alert(error.msg, "error")));
    } else {
      dispatch(show_alert("Profile update failed", "error"));
    }
  }
};

export const clear_player_profile = () => async dispatch => {
  dispatch({
    type: PLAYER_PROFILE_CLEARED
  });
  dispatch({
    type: PLAYER_EXPERIENCE_CLEARED
  });
};

export const load_update_form = () => async dispatch => {
  dispatch({
    type: UPDATE_FORM_LOADED
  });
};

export const clear_active_profile = () => async dispatch => {
  dispatch({
    type: ACTIVE_PROFILE_CLEARED
  });
};