import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div
        style={{
          height: "100%",
          fontSize: "30px",
          fontFamily: "serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        欢迎使用你自己开发的后台管理系统
      </div>
    );
  }
}

export default Home;
