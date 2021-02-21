import { Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { changeTitle } from "../../redux/actions";

class NotFound extends Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <h1 style={{ fontSize: 30, fontFamily: "serif", fontWeight: "bold" }}>
          404
        </h1>
        <p>抱歉,您访问的页面不存在</p>
        <Button
          type="primary"
          onClick={() => {
            this.props.changeTitle("首页");
            this.props.history.replace("/");
          }}
        >
          回到主页
        </Button>
      </div>
    );
  }
}

export default connect((state) => ({}), { changeTitle })(NotFound);
