/**
 * 包括生成 action对象 的工厂函数
 */
import {
  CHANGETITLE,
  CHANGEUSER,
  SHOW_ERROR_MSG,
  DELETEUSEROFREDUX,
} from "./constants";
import { reqLogin } from "../api/index";
import { message } from "antd";
import storage from "../utils/storageUtil";

// 改变头标题的同步 action creators
export const changeTitle = (data) => ({ type: CHANGETITLE, data: data });
// 改变用户的同步 action creators
export const changeUser = (data) => ({ type: CHANGEUSER, data });
// 登录失败存入redux中errorMsg的 同步 action creators
export const addErrorMsg = (data) => ({ type: SHOW_ERROR_MSG, data });
// 清空用户数据
export const deleteUserOfRedux = () => ({ type: DELETEUSEROFREDUX, data: "" });

// 【 登录的异步 action 】
// 登录发送请求
// 暂不知道为什么整个登录请求都用redux里面写
export const login = (username, password) => {
  return async (dispatch) => {
    // 1. 执行异步 ajax 请求
    const result = await reqLogin(username, password);
    console.log(result);
    if (result.status === 0) {
      // 2.1. 如果成功,分发成功的 action
      const user = result.data;
      // 将用户数据存入 localStorage
      storage.setUser(user);
      // 分发接收用户的同步 action
      dispatch(changeUser(user));
    } else {
      // 2.2. 如果失败,分发失败的 action
      message.error(result.msg);
      // 可以直接提示 错误信息,也可以存入 redux 状态,展示(这不是有病么)
      dispatch(addErrorMsg(result.msg));
    }
  };
};
