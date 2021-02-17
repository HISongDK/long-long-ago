import { Button, Card, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import AddUpdateUser from "./components/addUpdate-user";
import {
  reqAddUser,
  reqDeleteUser,
  reqUpdateUser,
  reqUserList,
} from "../../api";
import timeFormat from "../../utils/timeFormatUtil";

function User() {
  // 定义对话框是否展示状态
  const [isVisable, setVisable] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [subForm, setSubForm] = useState();
  const [updateInfo, setUpdateInfo] = useState({});
  // 删除用户得回调
  async function deleteUser(role) {
    // console.log(role);
    const _id = role._id;
    const result = await reqDeleteUser(_id);
    if (result.status === 0) {
      getUserList();
    }
  }
  // 定义初始展示数据
  async function getUserList() {
    const result = await reqUserList();
    // console.log(result);
    if (result.status === 0) {
      message.success("获取用户列表成功");
      // console.log(result.data);
      setUsers(result.data.users);
      setRoles(result.data.roles);
    } else {
      message.error("获取用户列表失败");
    }
  }
  // 确认添加回调
  async function onOk() {
    subForm.validateFields();
    // console.log(subForm.getFieldsValue());
    let user = subForm.getFieldsValue();
    // 判断是否为更改
    if (updateInfo._id) {
      user._id = updateInfo._id;
      let result = await reqUpdateUser(user);
      // console.log(result);
      if (result.status === 0) {
        message.success("修改用户成功");

        setVisable(false);
        getUserList();
      } else {
        message.error("result.msg");
      }
    } else {
      let result = await reqAddUser(user);
      // console.log(result);
      if (result.status === 0) {
        message.success("用户添加成功");
        setVisable(false);
        getUserList();
      } else {
        message.error(result.msg);
      }
    }
  }
  // 点击修改的回调
  function UpdataUser(role) {
    setVisable(true);
    setUpdateInfo(role);
    // console.log(role);
  }
  // 模拟生命周期
  useEffect(() => {
    getUserList();
  }, []);
  // 定义初始列
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "电话",
      dataIndex: "phone",
    },
    {
      title: "注册时间",
      dataIndex: "create_time",
      render: timeFormat,
    },
    {
      title: "所属角色",
      dataIndex: "role_id",
      render: (roleId) => {
        // console.log(roles);
        // console.log(users);
        // console.log(roleId);
        if (roles.length !== 0) {
          let role = roles.find((i) => i._id === roleId);
          return role.name;
        }
      },
    },
    {
      title: "操作",
      render: (role) => (
        <>
          <Button type="link" onClick={() => UpdataUser(role)}>
            修改
          </Button>
          <Button type="link" onClick={() => deleteUser(role)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Card
        title={
          <Button
            onClick={() => {
              setVisable(true);
              setUpdateInfo({});
            }}
            type="primary"
          >
            添加用户
          </Button>
        }
        style={{ minHeight: "100%", overflow: "hidden" }}
      >
        <Table
          bordered
          dataSource={users}
          columns={columns}
          rowKey="_id"
        ></Table>
        <Modal
          title={updateInfo._id ? "修改用户" : "添加用户"}
          visible={isVisable}
          onCancel={() => setVisable(false)}
          onOk={onOk}
          destroyOnClose
        >
          <AddUpdateUser
            roles={roles}
            setForm={(form) => setSubForm(form)}
            updateInfo={updateInfo}
          ></AddUpdateUser>
        </Modal>
      </Card>
    </>
  );
}

export default User;
