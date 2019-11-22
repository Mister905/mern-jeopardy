import axios from "axios";
import { set_alert } from "../actions/alert";
import {
  ACTIVE_PROFILE_LOADED,
  ACTIVE_PROFILE_CLEARED,
  ALL_PROFILES_LOADED,
  PLAYER_NAME_LOADED,
  PLAYER_PROFILE_LOADED,
  PLAYER_PROFILE_CLEARED,
  EXPERIENCE_CLEARED
} from "./types";

// Get Active User's Profile
export const get_profile = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/api/profile/active");
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
    const res = await axios.get("http://localhost:5000/api/profile/all");

    const profiles = res.data;

    const get_users = async profiles => {
      let users = [];
      for await (const profile of profiles) {
        let user_obj = {};
        user_obj.profile_id = profile._id;
        let res = await axios.get(
          `http://localhost:5000/api/auth/${profile.user._id}`
        );
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
      `http://localhost:5000/api/profile/get_profile_by_profile_id/${profile_id}`
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
      `http://localhost:5000/api/profile/get_profile_by_user_id/${user_id}`
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
    const res = await axios.get(`http://localhost:5000/api/auth/${user_id}`);
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
          dispatch(set_alert("error", "File size exceeds 2 MB"));
        }
      }

      const form_data_object = Object.keys(form_data).reduce((f, k) => {
        f.append(k, form_data[k]);
        return f;
      }, new FormData());

      const res = await axios.post(
        "http://localhost:5000/api/profile/create",
        form_data_object
      );

      dispatch({
        type: ACTIVE_PROFILE_LOADED,
        payload: res.data
      });

      dispatch(set_alert("success", "Profile creation successful"));

      history.push("/dashboard");
    } else {
      dispatch(set_alert("error", "Biography is a required field"));
    }
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(set_alert("error", error.msg)));
    } else {
      dispatch(set_alert("error", "Login failed"));
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
          dispatch(set_alert("error", "File size exceeds 2 MB"));
        }
      }

      const form_data_object = Object.keys(form_data).reduce((f, k) => {
        f.append(k, form_data[k]);
        return f;
      }, new FormData());

      const res = await axios.post(
        "http://localhost:5000/api/profile/update",
        form_data_object
      );

      dispatch({
        type: ACTIVE_PROFILE_LOADED,
        payload: res.data
      });

      dispatch(set_alert("success", "Profile update successful"));
      history.push("/profile");
    } else {
      dispatch(set_alert("error", "Biography is a required field"));
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(set_alert("error", error.msg)));
    } else {
      dispatch(set_alert("error", "Profile update failed"));
    }
  }
};

export const clear_player_profile = () => async dispatch => {
  dispatch({
    type: PLAYER_PROFILE_CLEARED
  });
  dispatch({
    type: EXPERIENCE_CLEARED
  });
};
