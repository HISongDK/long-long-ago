import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";

import "./index.less";
import menuList from "../../config/menuConfig";
// import memoryUtil from "../../utils/memoryUtil";
// 使用connect包起来生成容器组件
import { connect } from "react-redux";
import { changeTitle } from "../../redux/actions";
// 引入 redux中的store 用于dispact
// 引入 action 中的action creators工厂函数
// import store from "../../redux/store";
const { SubMenu } = Menu;

function LeftNav(props) {
  // 取选中值
  let selectKey = props.location.pathname;
  if (selectKey.indexOf("/product") > -1) {
    // 本来当前路径直接选中,判断地址栏路径就行
    // 但是有二级路由的路径不同, 没有相匹配的key值,所以判断包括一级路由的路径,改成一级的key值就行
    selectKey = "/product";
  }
  // 取默认展开值
  let defaultOpenKey = "";
  // 定义筛选生成路由的判断函数
  function hasAuth(item) {
    const { key, isPublic, children } = item;
    // const { menus } = memoryUtil.user.role;
    // const { username } = memoryUtil.user;
    const { menus } = props.user.role;
    const { username } = props.user;

    // 以上注释的简写
    if (username === "admin" || isPublic || menus.indexOf(key) > -1)
      return true;
    // 当用户名为 admin 或 当前路由项公开(有isPublic属性且为true)
    // 最后一种 返回true的情况 : 就是判断当前用户包含的权限中是否含有每个路由项的路由 ,有的话才返回true,继续操作返回链接菜单项结构
    if (children) {
      // 如果当前项存在 children
      // 遍历查询子路由是否存在于 权限 menus
      // !! 双非 把返回的元素或者undefined 转为 boolean 返回
      return !!children.find((item) => menus.indexOf(item.key) > -1);
    }
    return false;
    // 以上共有 4 中返回true的可能
  }

  // 根据路由数据数组遍历返回对应的标签结构
  function getMenuNode(menuList) {
    /**
     * 根据路由数据数组遍历返回对应的标签结构
     * 用到两个重要方法:
     * 1. map()遍历
     * 2. 递归调用
     */
    return menuList.map((item) => {
      if (hasAuth(item)) {
        // 判断登录用户包含的权限含有的 路径才生成链接 返回结构

        // redux 的title 初始值在刷新的时候,不过什么页面都显示的,写好的固定值. 要避免这个问题.
        // 在遍历生成结构的时候, 判断当前 item 是不是页面当前的路由项,如果是就直接改变 redux 中title的值
        const path = props.location.pathname;
        if (item.key === path || item.key.indexOf(path) > -1)
          props.changeTitle(item.title);

        // 判断 分支 递归 生成结构
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={<item.icon />}>
              {/* antd4 的图表组件,一定要带上尖角号,不过没想到这样不用字符串拼接也能行 */}
              <Link onClick={() => props.changeTitle(item.title)} to={item.key}>
                {/* 
                    确实是不知道为什么:
                        没用 容器组件包起来 通过mapDispatch 传入 UI 组件dispatch的时候,确实是不行,状态乱变,固定最后一个
                        包完 容器组件 用connect忘UI组件的props里传入mapDispatch然后再通过 props调用就没问题了
                */}
                {item.title}
              </Link>
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
      } else {
        return null;
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

export default connect((state) => ({ user: state.user }), { changeTitle })(
  withRouter(LeftNav)
);
