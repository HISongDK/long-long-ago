import React, { useEffect, useRef } from "react";
import { Form, Input, Select } from "antd";

const Item = Form.Item;
const Option = Select.Option;
function AddUpdateUser(props) {
  const { roles } = props;
  const { updateInfo } = props;
  console.log(updateInfo);
  // 把修改用户回显数据结构出来
  const { email, phone, username, role_id } = updateInfo;
  const addUpdateForm = useRef();
  useEffect(() => {
    console.log(addUpdateForm);
    props.setForm(addUpdateForm.current);
  }, []);
  return (
    <Form
      ref={addUpdateForm}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 15 }}
      initialValues={
        username
          ? {
              username,
              email,
              role_id,
              phone,
            }
          : null
      }
    >
      <Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: "必填",
          },
        ]}
      >
        <Input placeholder="请输入用户名"></Input>
      </Item>
      {username ? null : (
        <Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "密码必填",
            },
          ]}
        >
          <Input placeholder="请输入密码"></Input>
        </Item>
      )}
      <Item name="phone" label="手机号">
        <Input placeholder="请输入手机号"></Input>
      </Item>
      <Item name="email" label="邮箱">
        <Input placeholder="请输入邮箱"></Input>
      </Item>
      <Item
        name="role_id"
        label="角色"
        rules={[
          {
            required: true,
            message: "角色必选",
          },
        ]}
      >
        <Select placeholder="请选择角色">
          {roles.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Item>
    </Form>
  );
}

export default AddUpdateUser;
