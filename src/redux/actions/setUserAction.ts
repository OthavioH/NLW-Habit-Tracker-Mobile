import IUserInfo from "../../shared/models/UserInfo";
import { USER_CHANGE } from "../constants";

export default function setUserAction(user: IUserInfo) {
  return {
    type: USER_CHANGE,
    payload: user,
  };
}
