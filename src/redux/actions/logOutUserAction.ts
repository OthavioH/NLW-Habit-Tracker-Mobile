import { USER_LOGOUT } from "../constants";

export default function logOutUserAction() {
  return {
    type: USER_LOGOUT,
    payload: null,
  };
}
