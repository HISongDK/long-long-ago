import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Admin from "./pages/admin/admin.jsx";
import "./App.less";

/**
 * 根组件
 */
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* 我也是才看出来react配置路由和vue占位符一样,哪需要显示往哪配 */}
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch>
      </Router>
    );
  }
}
