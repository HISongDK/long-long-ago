/**
 * 入口文件
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./utils/storageUtil";
import memoryUtil from "./utils/memoryUtil";

const user = store.getUser();
memoryUtil.user = user;
ReactDOM.render(<App />, document.getElementById("root"));
