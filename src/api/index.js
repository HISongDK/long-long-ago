/**
 * 要求能力:【能根据接口文档定义接口请求函数】
 * 包含应有中,所有接口请求函数
 * 每个函数的返回值都是promise
 *
 * 基本要求: 能够根据接口文档定义接口请求函数
 */

import { message } from "antd";
import jsonp from "jsonp";
import { PAGE_SIZE } from "../utils/constants";
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
// 更新用户
export const reqUpdateUser = (user) =>
  ajax(BASE_URL + "manage/user/update", user, "post");
// 获取分类
export const reqCategorys = (parentId) =>
  ajax(BASE_URL + "/manage/category/list", { parentId });
// 添加分类
export const reqAddCategory = (parentId, categoryName) =>
  ajax(BASE_URL + "/manage/category/add", { parentId, categoryName }, "post");
// 修改分类
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(
    BASE_URL + "/manage/category/update",
    { categoryId, categoryName },
    "post"
  );
// 请求商品(分页)
export const reqProducts = (pageNum = 1, pageSize = PAGE_SIZE) =>
  ajax(BASE_URL + "/manage/product/list", { pageNum, pageSize }); // 我是真不长记性啊 ,封装的请求函数又忘了返回值,记住啊,函数的参数和返回值都是要好好想想的啊

/* 
  搜索商品分页列表(通过商品描述/名称)
  searchType 指定 productName || productDesc
  searchName 就是要搜的内容
*/
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) =>
  ajax(BASE_URL + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });
// 通过id获取分类信息
export const reqCategory = (categoryId) =>
  ajax(BASE_URL + "/manage/category/info", { categoryId });

// 商品上架/下架
export const reqUpdateStatus = (productId, status) =>
  ajax(
    BASE_URL + "/manage/product/updateStatus",
    { productId, status },
    "POST"
  );
// 删除图片
export const reqDeleteImg = (name) =>
  ajax(BASE_URL + "/manage/img/delete", { name }, "post");
// 上传 添加商品
// 我也是才发现我个傻憨憨 搁着还加BASE_URl,明明都用的是代理
export const reqAddProduct = (productInfo) =>
  productInfo._id
    ? ajax(BASE_URL + "/manage/product/update", productInfo, "post")
    : ajax(BASE_URL + "/manage/product/add", productInfo, "post");
// 获取角色列表
export const reqRoleList = () => ajax(BASE_URL + "/manage/role/list");
// 添加角色
export const reqAddRole = ({ roleName }) =>
  ajax(BASE_URL + "/manage/role/add", { roleName }, "post");
// 更新角色(给角色设置权限)
export const reqUpdateRole = (roleInfo) =>
  ajax(BASE_URL + "/manage/role/update", roleInfo, "post");
// 获取所有 用户 列表
export const reqUserList = () => ajax(BASE_URL + "/manage/user/list");
// 删除用户
export const reqDeleteUser = (userId) =>
  ajax(BASE_URL + "/manage/user/delete", { userId }, "post");
// 添加用户 最上面已经写过了
// export const reqAddUser = () =>
//   ajax(BASE_URL + "/manage/user/add", userInfo, "post");
/* 
  
  
  
  
  
  
  
  
  
  
  
*/
/**
 * 以上自己写的三个请求函数竟然忘了写返回值了
 * ajax 封装好的 自然会返回一个 promise 对象
 * 问题是 自己再次封装的函数却忘了返回值了
 * 打印出 undefined 自然是函数没有 return 的时候默认返回值
 */
// jsonp 请求天气
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    jsonp(
      `https://v0.yiketianqi.com/api?appid=56862258&appsecret=c8tBmWNk&version=v61&city=${city}`,
      {},
      (err, data) => {
        if (!err) {
          const { wea, wea_img } = data;
          resolve({ wea, wea_img });
        } else {
          message.error("获取天气信息失败", 0.8);
        }
      }
    );
  });
};
