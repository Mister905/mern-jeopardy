import uuid from "uuid";
import {
  SET_ALERT,
  REMOVE_ALERT,
  SHOW_ALERT_MESSAGE,
  HIDE_ALERT_MESSAGE
} from "./types";

export const set_alert = (alert_type, message) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { id, alert_type, message }
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};

export const show_alert = (msg, type = "info") => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SHOW_ALERT_MESSAGE,
    payload: {
      id,
      show: true,
      msg,
      type
    }
  });
};
