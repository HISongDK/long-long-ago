/**
 * 能发送异步 ajax 请求的函数模块
 * 封装 axios 库
 * 返回值是 promise 对象
 * 优化:
 * 1. 统一处理请求异常
 *      返回promise对象，如果成功就 把结果 resolve 出去
 *      失败就直接 当场提示
 *      【在外层包裹promise实例，成功就把结果resolve出去，失败直接处理提示】
 * 2. 直接获取报文中的 data 数据 resolve出去
 *      避免后面每次都从 报文中取
 */

import { message } from "antd";
import axios from "axios";

export default function ajax(url, data = {}, type = "GET") {
  //data 参数可能不传 所以指定一下默认值为: 空对象
  //type 请求类型先默认是 GET ,如果真是请求为get,可不传,如果是post,就以传入参数为准
  return new Promise((resolve, reject) => {
    let promise;
    if (type === "GET") {
      promise = axios.get(url, {
        params: data,
        // 配置对象
      });
    } else {
      promise = axios.post(url, data);
    }

    promise
      .then((response) => {
        response = response.data;
        resolve(response);
      })
      .catch((error) => {
        message.error("请求出错: " + error.message, 1);
        // 第一个参数是显示 的信息，所以要拼接成一个
        // 第二个参数是持续时间 单位 s 而不是 ms
      });
  });
}
