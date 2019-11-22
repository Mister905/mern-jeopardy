import {
  ACTIVE_PROFILE_LOADED,
  ACTIVE_PROFILE_CLEARED,
  ALL_PROFILES_LOADED,
  PLAYER_NAME_LOADED,
  PLAYER_PROFILE_LOADED,
  PLAYER_PROFILE_CLEARED
} from "../actions/types";

const initial_state = {
  active_profile: null,
  profiles: [],
  player_name: null,
  player_profile: null,
  loading_player_name: true,
  loading_profile: true,
  loading_profiles: true,
  loading_profile_image: true
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIVE_PROFILE_LOADED:
      return {
        ...state,
        active_profile: payload,
        loading_profile: false
      };
    case ALL_PROFILES_LOADED:
      return {
        ...state,
        profiles: payload,
        loading_profiles: false
      };
    case ACTIVE_PROFILE_CLEARED:
      return {
        ...state,
        active_profile: null,
        loading_profile: false
      };
    case PLAYER_NAME_LOADED:
      const { first_name, last_name } = payload;
      return {
        ...state,
        player_name: `${first_name} ${last_name}`,
        loading_player_name: false
      };
    case PLAYER_PROFILE_LOADED:
      return {
        ...state,
        player_profile: payload,
        loading_profile: false
      };
    case PLAYER_PROFILE_CLEARED:
        return {
            ...state,
            player_name: null,
            player_profile: null,
            loading_profile: true,
            loading_player_name: true
        }
    default:
      return state;
  }
}
