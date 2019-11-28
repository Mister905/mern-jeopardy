import {
  ACTIVE_EXPERIENCE_LOADED,
  PLAYER_EXPERIENCE_LOADED,
  ACTIVE_EXPERIENCE_ITEM_LOADED,
  PLAYER_EXPERIENCE_ITEM_LOADED,
  EXPERIENCE_ITEM_DELETED,
  ACTIVE_EXPERIENCE_CLEARED,
  PLAYER_EXPERIENCE_CLEARED,
  EXPERIENCE_ITEM_LOADED,
  EXPERIENCE_ITEM_CLEARED
} from "../actions/types";

const initial_state = {
  loading_active_experience: true,
  loading_player_experience: true,
  loading_experience_item: true,
  active_experience: [],
  player_experience: [],
  experience_item: {}
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIVE_EXPERIENCE_LOADED:
      return {
        ...state,
        loading_active_experience: false,
        active_experience: payload
      };
    case PLAYER_EXPERIENCE_LOADED:
      return {
        ...state,
        loading_player_experience: false,
        player_experience: payload
      };
    case PLAYER_EXPERIENCE_CLEARED:
      return {
        ...state,
        loading_player_experience: true,
        player_experience: []
      };
    case ACTIVE_EXPERIENCE_CLEARED:
      return {
        ...state,
        loading_active_experience: true,
        active_experience: []
      };
    case EXPERIENCE_ITEM_LOADED:
      return {
        ...state,
        loading_experience_item: false,
        experience_item: payload
      };
    case EXPERIENCE_ITEM_DELETED:
      return {
        ...state,
        active_experience: payload
      };
    case EXPERIENCE_ITEM_CLEARED:
      return {
        loading_experience_item: true,
        experience_item: {}
      };
    default:
      return state;
  }
}
