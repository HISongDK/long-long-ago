import React, { Component, createRef } from "react";
import { Card, Button, Table, message, Modal } from "antd";
import { reqAddRole, reqRoleList, reqUpdateRole } from "../../api";
import AddForm from "./components/add-form";
import AuthForm from "./components/auth-form";
import memoryUtil from "../../utils/memoryUtil";
import timeFormat from "../../utils/timeFormatUtil";
import storage from "../../utils/storageUtil";

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [], // 所有角色的列表
      role: {}, // 选中的角色  // 判断有无内容实现 按钮禁用切换
      isShowModal: 0, // 对话框显示
      isLoading: false,
    };
    this.AuthFormRef = createRef();
  }
  // 定义初始 columns
  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: timeFormat,
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: timeFormat,
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
      },
    ];
  };
  // 定义获取角色列表函数
  getRoles = async () => {
    const result = await reqRoleList();
    // console.log(result);
    if (result.status === 0) {
      // let roles = result.data.map((item, index) => ({
      //   ...item,
      //   create_time: timeFormat(item.create_timer),
      //   auth_time: timeFormat(item.auth_time),
      // }));
      // 时间格式修改之后,后面修改权限获取的数据也是修改之后的数据了,所以设定权限时候会失败
      let roles = result.data;
      this.setState({
        roles,
      });
    } else {
      message.success("获取角色列表失败");
    }
  };
  // 关闭对话框
  onCancel = () => {
    this.setState({ isShowModal: 0 });
  };
  // 确定添加角色回调
  onAddOk = async () => {
    let addRoleName = this.addForm.getFieldsValue();
    // console.log(addRoleName);
    const result = await reqAddRole(addRoleName);
    // console.log(result);
    if (result.status === 0) {
      message.success("添加角色成功");
      this.setState((state) => ({
        isShowModal: 0,
        roles: [...state.roles, result.data],
      }));
      // 再次获取用户列表,这就体现了封装的好处了,尝到了一点甜头.说不定啥时候就用上了
      // this.getRoles();  // 不用发请求直接在上面更新一下状态就行
    } else {
      message.error("添加角色失败");
    }
  };
  // 确定设置管理权限的回调
  onManageOk = async () => {
    const AuthForm = this.AuthFormRef.current;
    console.log(AuthForm);
    const { menus } = AuthForm.state;
    const roleInfo = { ...this.state.role };
    roleInfo.menus = menus;
    roleInfo.auth_name = memoryUtil.user.username;
    console.log(roleInfo);
    const result = await reqUpdateRole(roleInfo);
    // console.log(result);
    if (result.status === 0) {
      // 如果更新的是当前用户的权限 , 则强制退出
      if (memoryUtil.user.role_id === roleInfo._id) {
        // 这个判断我是真拿不准,直接看来用的
        // 强制退出前先清数据
        memoryUtil.user = {};
        storage.removeUser();
        this.props.history.replace("/login");
        message.info("当前用户角色权限更新,请重新登录");
      } else {
        message.success("修改权限成功");
        // 修改权限后重新获取 角色列表
        this.getRoles();
        this.setState({ isShowModal: 0, role: result.data });
        // 这个地方要更新一下状态,我也是找了好长时间啊
      }
    } else {
      message.error("修改权限失败");
    }
  };
  // 定义Table组件onRow
  onRow = (role) => ({
    onClick: (event) => {
      // console.log(role);
      this.setState({ role });
    },
  });

  // 调用初始 列格式
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  // 调用函数获取 角色列表
  componentDidMount() {
    this.getRoles();
  }
  // render() 渲染
  render() {
    // 取出 state 数据
    const { roles, role, isLoading, isShowModal } = this.state;
    const { onAddOk, onCancel, onManageOk } = this;
    // 生成 卡片title结构
    const title = (
      <>
        {/* 不明白为什么上面会生成一对 括号引号 */}
        <Button
          onClick={() => this.setState({ isShowModal: 1 })}
          type="primary"
          style={{ marginRight: 15 }}
        >
          创建角色
        </Button>
        <Button
          onClick={() => {
            this.setState({ isShowModal: 2 });
          }}
          type="primary"
          disabled={!role._id}
        >
          设置角色权限
        </Button>
      </>
    );
    return (
      <Card title={title} style={{ minHeight: "100%" }}>
        <Table
          rowSelection={{
            type: "radio",
            columnWidth: 64,
            selectedRowKeys: [role._id], // 真是三翻四抖啊,Table行的回调事件获取参数(这一行的数据),里面的单击的回调里面,把这行的数据更新到状态里,这再设置选中的key值
            // 因为选中那行的 key 值 就是那一行数据中的 _id 的值,所以把选中行的数据更新到 state 中, 然后再把里面的 _id 设置为单选选中的 key值
            onSelect: (role) => {
              // 不明白为什么这个 状态有值了 单选框才会被选中
              this.setState({ role });
              // 啊 是我自己设置的的选中的 key 值是 role 状态中的 _id
            },
          }}
          onRow={this.onRow}
          dataSource={roles}
          columns={this.columns}
          bordered={true}
          rowKey="_id"
          pagination={{
            defaultPageSize: 5,
          }}
          loading={isLoading}
        ></Table>
        <Modal
          visible={isShowModal === 1}
          title="创建角色"
          onOk={onAddOk}
          onCancel={onCancel}
          destroyOnClose={true}
        >
          <AddForm getForm={(form) => (this.addForm = form)}></AddForm>
        </Modal>
        <Modal
          visible={isShowModal === 2}
          title="管理权限"
          onOk={onManageOk}
          onCancel={onCancel}
          destroyOnClose={true}
        >
          <AuthForm ref={this.AuthFormRef} role={role}></AuthForm>
        </Modal>
      </Card>
    );
  }
}

export default Role;
