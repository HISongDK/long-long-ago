import { Input, Select, Form } from "antd";
import React, { Component, createRef } from "react";

class AddForm extends Component {
  /* 
    通过 ref 和 时间获取form实例的方法没白记
    且睡觉
  */
  constructor(props) {
    super(props);
    this.addFormRef = createRef();
  }
  componentDidMount() {
    this.props.getForm(this.addFormRef.current);
  }
  render() {
    return (
      <Form ref={this.addFormRef}>
        <p>选择分类</p>
        <Form.Item name="choose">
          <Select>
            <Select.Option value="0">xiankankan</Select.Option>
          </Select>
        </Form.Item>

        <p>分类名称:</p>
        <Form.Item name="category">
          <Input></Input>
        </Form.Item>
      </Form>
    );
  }
}

export default AddForm;
