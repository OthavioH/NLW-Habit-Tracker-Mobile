import { USER_CHANGE, USER_LOGOUT } from "../constants";

const initialState = {
  user: null,
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case USER_CHANGE:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
