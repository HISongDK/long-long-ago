import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import AddUpdate from "./pages/add-update";
import Detail from "./pages/detail";
import "./product.less";

class Product extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/product/add" component={AddUpdate}></Route>
            <Route path="/product/detail" component={Detail}></Route>

            <Route path="/product" component={Home}></Route>
            {/*
             因为 Switch 只匹配一个路径,所以这个只写了一层到phome的路由要放在下面,放在上面的话,访问另两个子路由都只会匹配到这一个 
             
             或者像这样设置一个 精确匹配的属性 exact
            */}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default Product;
