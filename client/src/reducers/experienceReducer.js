import {
  EXPERIENCE_LOADED,
  EXPERIENCE_ITEM_LOADED,
  EXPERIENCE_DELETED,
  EXPERIENCE_CLEARED
} from "../actions/types";

const initial_state = {
  loading_experience: true,
  experience: [],
  experience_item: null
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case EXPERIENCE_LOADED:
      return {
        ...state,
        loading_experience: false,
        experience: payload
      };
    case EXPERIENCE_ITEM_LOADED:
      return {
        ...state,
        loading_experience: false,
        experience_item: payload
      };
    case EXPERIENCE_DELETED:
      return {
        ...state,
        experience: payload
      };
    case EXPERIENCE_CLEARED:
      return {
        loading_experience: true,
        experience: [],
        experience_item: null
      };
    default:
      return state;
  }
}
