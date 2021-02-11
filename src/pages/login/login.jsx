import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import memoryUtil from "../../utils/memoryUtil";
import store from "../../utils/storageUtil";
import "./login.less";

import { reqLogin } from "../../api/index";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const { username, password } = values;
    let result = await reqLogin(username, password);
    console.log("请求成功", result);
    if (result.status === 0) {
      message.success("登录成功", 0.8);
      //-----------先保存一下用户信息
      memoryUtil.user = result.data;
      store.setUser(result.data);
      this.props.history.replace("/");
    } else {
      message.error(result.msg, 0.8);
    }
  };
  render() {
    // 如果用户已经登录，自动跳转到 admin 页面
    const user = memoryUtil.user;
    if (user && user._id) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login">
        <header className="login-header"></header>
        <section className="login-content">
          <h1>用户登录</h1>
          <div className="form">
            <Form
              name="normal_login"
              className="login-form"
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "请输入用户名" },
                  { max: 12, message: "用户名最长不得超过十二位" },
                  { min: 4, message: "用户名最短不得小于四位" },
                  {
                    pattern: /^[0-9a-zA-Z_]{1,}$/,
                    message: "用户名只能含有字母数字下划线",
                  },
                ]}
                initialValue="admin"
                // initialVale 属性指定初始值
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="用户名"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入密码",
                  },

                  { max: 12, message: "密码最长不得超过十二位" },
                  { min: 4, message: "密码最短不得小于四位" },
                  {
                    pattern: /^[0-9a-zA-Z_]{1,}$/,
                    message: "密码只能含有字母数字下划线",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item> */}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit" //antd 的button想提交就就得设置一个属性 htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
            {/* ); 我说怎么有问题,多复制了一行 留记 */}
          </div>
        </section>
      </div>
    );
  }
}
/**
 * async await
 * 1. 作用
 *      简化promise对象的使用: 不再使用 then() 方法指定成功和失败的回调函数
 *      以同步编码方式(没有回调函数)实现异步流程
 * 2. 哪里写async
 *      在返回 promise 对象的表达式左侧
 *      [目的]: 不想要promise对象,而是要promise对象执行成功的结果
 * 3. 哪里写await
 *      await 所在最近的函数定义 左侧
 */
