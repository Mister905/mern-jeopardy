import { SET_ALERT, REMOVE_ALERT, SHOW_ALERT_MESSAGE } from "../actions/types";

const initial_state = {
  alert: {
      id: "",
    show: false,
    msg: "",
    type: "info"
  }
};

export default function(state = initial_state, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_ALERT_MESSAGE:
      return {
        ...state,
        alert: {
          id: payload.id,
          show: true,
          msg: payload.msg,
          type: payload.type
        }
      };

    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
