/**
 * 要求能力:【能根据接口文档定义接口请求函数】
 * 包含应有中,所有接口请求函数
 * 每个函数的返回值都是promise
 */

import ajax from "./ajax";

let BASE_URL = "http://localhost:5000";
BASE_URL = "";
// export function reqLogin(username, password) {
//   return ajax("/login", { username, password }, "POST");
// }
/**
 * export 分别暴露
 * 所有登录请求的 路径和方法 接口文档都是规定好的 只有参数是每个用户登录时 不同的
 * 所以类似的请求 都需要再次封装,只传入不同的用户名和密码就行
 * 而且使用 箭头函数 写法要简洁
 */

// 登录
export const reqLogin = (username, password) =>
  ajax(BASE_URL + "/login", { username, password }, "post");
// 添加用户
export const reqAddUser = (user) =>
  ajax(
    BASE_URL + "/manage/user/add",
    // { username, password, phone, email, role_id },
    // 用户信息参数过多,不比一个个写成参数,直接传用户信息的对象就行了
    user,
    "post"
  );
