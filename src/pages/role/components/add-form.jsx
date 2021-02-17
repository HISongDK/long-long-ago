import { Input, Form } from "antd";
import React, { Component, createRef } from "react";

class AddForm extends Component {
  /* 
    通过 ref 和 时间获取form实例的方法没白记
  */
  constructor(props) {
    super(props);
    this.addFormRef = createRef();
  }
  componentDidMount() {
    this.props.getForm(this.addFormRef.current);
    this.form = this.addFormRef.current;
  }
  render() {
    return (
      <Form ref={this.addFormRef}>
        <Form.Item
          label="角色名称"
          name="roleName"
          rules={[
            { required: true, message: "角色名不能为空" },
            { whitespace: true, message: "角色名不能为空" },
          ]}
        >
          <Input placeholder="请输入角色名称"></Input>
        </Form.Item>
      </Form>
    );
  }
}

export default AddForm;
