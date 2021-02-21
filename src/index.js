/**
 * 入口文件
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import storage from "./utils/storageUtil";
// import memoryUtil from "./utils/memoryUtil";

// 使用 redux
import { Provider } from "react-redux";
import store from "./redux/store";

// 不需要了
// const user = storage.getUser(); // 从本地储存中获取 user 信息
// memoryUtil.user = user; // 把 user 信息保存在 memoryUtil 工具文件中

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
