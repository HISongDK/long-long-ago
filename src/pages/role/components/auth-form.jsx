import { Form, Input, Tree } from "antd";
import React, { Component } from "react";
import menuConfig from "../../../config/menuConfig";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    const treeData = [
      {
        title: "平台权限",
        key: "all",
        children: this.initTreeData(menuConfig),
        /**
         * TODO: 弄出来是弄出来了,确实是像码农雨飞说的
         * TODO: 有时候递归弄出来了,也不知道是怎么出来的
         * TODO: 我这儿 ... 扩展运算符起到了不小作用,
         * TODO: 我发现了,... 其实应该没用的,是我不清楚map本来就返回一个数组,我还套了个数组,然后不对劲.又用 ... 给展开了,【多此两举】
         */
      },
    ];
    this.state = {
      treeData,
      menus: props.role.menus,
    };
    console.log(menuConfig, treeData);
  }
  // onSelect = (selectedKeys, info) => {
  //   console.log("selected", selectedKeys, info);
  // };

  onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
    this.setState({ menus: checkedKeys });
  };
  // 生成初始对象
  // TODO:这个根据数据生成格式数据或者标签结构,我一定得再弄一遍
  initTreeData = (menuConfig) => {
    return menuConfig.map((item) => {
      if (item.children) {
        return {
          title: item.title,
          key: item.key,
          children: this.initTreeData(item.children),
        };
      } else {
        return {
          title: item.title,
          key: item.key,
        };
      }
    });
  };
  render() {
    const { menus, treeData } = this.state;
    const { name } = this.props.role;

    return (
      <>
        <Form.Item label="角色名称">
          <Input disabled value={name}></Input>
        </Form.Item>

        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={menus}
          // onSelect={this.onSelect}
          onCheck={this.onCheck}
          treeData={treeData}
        />
      </>
    );
  }
}

export default AuthForm;
