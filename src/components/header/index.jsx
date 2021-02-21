import React, { useEffect, useState } from "react";
import "./index.less";
// import user from "../../utils/memoryUtil";
import timeFormat from "../../utils/timeFormatUtil";
import { reqWeather } from "../../api";
import { withRouter } from "react-router-dom";
// import menuList from "../../config/menuConfig";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import storageUtils from "../../utils/storageUtil";
// import memoryUtil from "../../utils/memoryUtil";
const BASE_URL = "http://localhost:3000";

function Header(props) {
  // 定时获取时间
  const [time, setTime] = useState(timeFormat());
  useEffect(() => {
    let timer = setInterval(() => {
      let t = timeFormat();
      t = t.replace(/\//g, "-");
      setTime(t);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  // 获取一次天气信息
  const [wea_img, setImg] = useState("");
  const [wea, setWea] = useState("");
  useEffect(() => {
    (async function () {
      let weather = await reqWeather("新乡");
      setImg(weather.wea_img);
      setWea(weather.wea);
    })();
  }, []);
  // 使用 redux 状态中保存的 当前页面名 不需要通过 url 路径判断 路由信息中查询
  const titleInRedux = props.title;

  // 退出弹框
  function modalConfirm() {
    Modal.confirm({
      title: "你确定要退出么",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "取消",
      onOk: function () {
        storageUtils.removeUser();
        // memoryUtil.user = {};
        // 清楚 redux 中的 user 信息
        props.deleteUserOfRedux();
        props.history.replace("/login");
      },
    });
  }
  return (
    <div className="header">
      <div className="top">
        <div className="innTop">
          欢迎: <span className="user">{props.user.username}</span> !{" "}
          <Button onClick={modalConfirm} type="link">
            退出
          </Button>
        </div>
      </div>
      <div className="bottom">
        <div className="path-title">{titleInRedux}</div>
        <div className="time-weather">
          <span>{time}</span>
          {wea_img ? (
            <img
              src={BASE_URL + `/images/${wea_img}.png`}
              alt={`[${wea_img}]`}
            />
          ) : null}
          <span>{wea}</span>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);
