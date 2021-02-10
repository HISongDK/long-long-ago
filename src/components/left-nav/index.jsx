import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";

import "./index.less";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;

function LeftNav(props) {
  // 取选中值
  let selectKey = props.location.pathname;
  if (selectKey.indexOf("/product") > -1) {
    selectKey = "/product";
  }
  // 取默认展开值
  let defaultOpenKey = "";

  // 根据路由数据数组遍历返回对应的标签结构
  function getMenuNode(menuList) {
    /**
     * 根据路由数据数组遍历返回对应的标签结构
     * 用到两个重要方法:
     * 1. map()遍历
     * 2. 递归调用
     */
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={<item.icon />}>
            {/* antd4 的图表组件,一定要带上尖角号,不过没想到这样不用字符串拼接也能行 */}
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        let cItem = item.children.find(
          (iItem) => selectKey.indexOf(iItem.key) === 0
        );
        // 完全相等当前路径,才会获取到,多以改成,后面包括前面的就行 草还真行
        if (cItem) {
          defaultOpenKey = item.key;
        }
        return (
          <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
            {/* 也没有想到的是,用字符串拼接反而不行 */}
            {getMenuNode(item.children)}
          </SubMenu>
        );
      }
    });
  }
  const result = getMenuNode(menuList);
  return (
    <>
      <Link to="/" className="left-nav">
        <header className="header">
          <h1>后台管理</h1>
        </header>
      </Link>

      <Menu
        // defaultSelectedKeys={[selectKey]}
        // 使用下面属性可以动态更新当前的路径值
        selectedKeys={[selectKey]}
        defaultOpenKeys={[defaultOpenKey]}
        mode="inline"
        theme="dark"
        // inlineCollapsed={this.state.collapsed}
      >
        {result}
        {/* 设置好默认展开的key值的话,再调用函数就自然是,晚了.所以可以先调用,保存个结果,再把结果结构写过来 */}
      </Menu>
    </>
  );
}

export default withRouter(LeftNav);
