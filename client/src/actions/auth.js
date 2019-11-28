import axios from "axios";
import { show_alert } from "./alert";
import set_auth_token from "../utils/set_auth_token";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  ACTIVE_PROFILE_CLEARED,
  ACTIVE_EXPERIENCE_CLEARED,
  PLAYER_EXPERIENCE_CLEARED,
  RESET_GAME
} from "./types";

// Load User
export const load_user = () => async dispatch => {
  if (localStorage.token) {
    set_auth_token(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// User Registration
export const register = (
  { first_name, last_name, email, password, password2 },
  history
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    password2
  });

  try {
    await axios.post("/api/auth/register", body, config);
    dispatch(show_alert("You have successfully registered", "success"))
    history.push("/login");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(show_alert(error.msg, "error")));
    }
  }
};

// User Login
export const login = ({ email, password }, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "/api/auth/login",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(load_user());
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL
    });
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(show_alert(error.msg, "error")));
    }
  }
};

// Logout User
export const logout = () => dispatch => {
  dispatch({ type: ACTIVE_PROFILE_CLEARED });
  dispatch({ type: ACTIVE_EXPERIENCE_CLEARED });
  dispatch({ type: PLAYER_EXPERIENCE_CLEARED });
  dispatch({ type: LOGOUT });
  dispatch({ type: RESET_GAME });
};
