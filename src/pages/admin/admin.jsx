import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import memoryUtil from "../../utils/memoryUtil";
// import store from "../../utils/storageUtil";

import { Layout } from "antd";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";

import Home from "../home/home";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Category from "../category/category";
import Bar from "../charts/bar";
import Pie from "../charts/pie";
import Line from "../charts/line";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    //刚才写的位置不对 不能直接写在外面
    const user = memoryUtil.user;
    // const user = store.getUser();
    console.log(user);
    if (!user || !user._id) {
      // 前面先写上是为了防止后面如果没有存user，然后直接读取user的属性 会报错，
      //在 render 中跳转要return一个重定向 Redirect 标签
      return <Redirect to="/login" />;
      // 当然你也可以函数式跳转，但是声明式跳转的话就得 return 毕竟是jsx语法
      // this.props.history.push("/login");
    }
    return (
      <>
        <Layout style={{ height: "100%" }}>
          {/* 这个行内样式要写两个花括号的，忘了具体，死记就行了 */}
          <Sider>
            <LeftNav></LeftNav>
          </Sider>
          <Layout>
            <Header></Header>
            <Content
              style={{ margin: 20, marginBottom: 0, backgroundColor: "#fff" }}
            >
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/product" component={Product} />
                <Route path="/role" component={Role} />
                <Route path="/user" component={User} />
                <Route path="/category" component={Category} />
                <Route path="/charts/bar" component={Bar} />
                <Route path="/charts/pie" component={Pie} />
                <Route path="/charts/line" component={Line} />
                <Redirect to="/home"></Redirect>
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center", color: "#ccc" }}>
              推荐使用谷歌浏览器，可以获得更佳页面操作体验
            </Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}
