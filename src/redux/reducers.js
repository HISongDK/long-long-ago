import { combineReducers } from "redux";
import {
  CHANGETITLE,
  CHANGEUSER,
  SHOW_ERROR_MSG,
  DELETEUSEROFREDUX,
} from "./constants";
import storage from "../utils/storageUtil";

function changeTitle(state = "", action) {
  switch (action.type) {
    case CHANGETITLE:
      return action.data;
    default:
      return state;
  }
}

const initUser = storage.getUser() || {};
function user(state = initUser, action) {
  switch (action.type) {
    case CHANGEUSER:
      return action.data;

    case SHOW_ERROR_MSG:
      // 也是不要直接修改原本的状态数据
      return { ...state, errorMsg: action.data };
    case DELETEUSEROFREDUX:
      return {};
    default:
      return state;
  }
}
export default combineReducers({
  changeTitle,
  user,
});
