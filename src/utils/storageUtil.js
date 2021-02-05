/**
 * 进行 localStorage 数据存储管理的工具模块
 */
import store from "store";
const USER_KEY = "user_key";
const user = {
  /**
   * 存储user
   */
  setUser: function (user) {
    // localStorage.setItem("user_key", JSON.stringify(user));
    store.set(USER_KEY, user);
  },
  /**
   * 获取user
   */
  getUser() {
    // localStorage.getItem(USER_KEY);
    return store.get(USER_KEY);
    // 因为是要取值的 所以要有返回值
  },
  /**
   * 移除user
   */
  removeUser() {
    // localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
  },
};
export default user;
