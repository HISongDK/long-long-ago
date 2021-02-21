import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import memoryUtil from "../../utils/memoryUtil";
// import store from "../../utils/storageUtil";

import { Layout } from "antd";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header/container/header";
// header 要引入容器组件 因为展示的 页面名 需要放到 redux 中管理
// 容器组价需要通过connect(mapStateToProps,mapDispatch)(UI组件) 向UI组件props中传入所需状态

import Home from "../home/home";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Category from "../category/category";
import Bar from "../charts/bar";
import Pie from "../charts/pie";
import Line from "../charts/line";
import { connect } from "react-redux";
import NotFound from "../not-found";

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //刚才写的位置不对 不能直接写在外面
    // const user = memoryUtil.user;
    // const user = store.getUser();
    const user = this.props.user;
    const path = this.props.location.pathname;
    // console.log(path);
    // console.log(user);
    if (!user || !user._id) {
      // 前面先写上是为了防止后面如果没有存user，然后直接读取user的属性 会报错，
      //在 render 中跳转要return一个重定向 Redirect 标签
      return <Redirect to="/login" />;
      // 当然你也可以函数式跳转，但是声明式跳转的话就得 return 毕竟是jsx语法
      // this.props.history.push("/login");
    } else if (
      user.username !== "admin" &&
      path !== "/notfound" &&
      user.role.menus.indexOf(path) === -1
    ) {
      // 就是加了一个判断 用户信息中包含的权限 中没有当前路由的话直接重定向就行了
      return <Redirect to="/home" />;
    }
    return (
      <>
        <Layout
          style={{
            minHeight: "100%",
            // minHeight 就是好用啊,我都不知道是不是这的问题,改一下就好了
            overflow: "auto",
          }}
        >
          {/* 这个行内样式要写两个花括号的，忘了具体，死记就行了 */}
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <LeftNav></LeftNav>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header></Header>
            <Content
              style={{
                margin: 20,
                marginBottom: 0,
                backgroundColor: "#fff",
              }}
            >
              <Switch>
                <Redirect from="/" to="/home" exact={true} />
                <Route path="/home" component={Home} />
                <Route path="/product" component={Product} />
                <Route path="/category" component={Category} />
                <Route path="/user" component={User} />
                <Route path="/role" component={Role} />
                <Route path="/charts/bar" component={Bar} />
                <Route path="/charts/line" component={Line} />
                <Route path="/charts/pie" component={Pie} />
                <Route component={NotFound} />
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
export default connect((state) => ({ user: state.user }), {})(Admin);
