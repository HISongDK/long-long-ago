import { Form, Input } from "antd";
import React, { Component, createRef } from "react";

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.updateFormRef = createRef();
  }
  componentDidMount() {
    console.log(this.updateFormRef.current);
    this.props.getUpdateForm(this.updateFormRef.current);
  }
  render() {
    const { Item } = Form;
    return (
      <Form
        ref={this.updateFormRef}
        initialValues={{ categoryName: this.props.disappearBack.name }}
      >
        <Item
          name="categoryName"
          rules={[
            { required: true, message: "分类名不能为空" },
            { whitespace: true, message: "分类名不能为空" },
          ]}
        >
          <Input></Input>
        </Item>
      </Form>
    );
  }
}

export default UpdateForm;
