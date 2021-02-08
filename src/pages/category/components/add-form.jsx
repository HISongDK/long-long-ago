import { Input, Select, Form } from "antd";
import React, { Component, createRef } from "react";
import memoryUtil from "../../../utils/memoryUtil";

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
    const { Option } = Select;
    const { parentId } = this.props;
    const { categorys } = memoryUtil;
    return (
      <Form ref={this.addFormRef} initialValues={{ parentId: `${parentId}` }}>
        <p>选择分类:</p>
        <Form.Item name="parentId">
          <Select>
            <Select.Option value="0">一级分类</Select.Option>
            {categorys.map((item) => (
              <Option value={item._id} key={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <p>分类名称:</p>
        <Form.Item
          name="categoryName"
          rules={[
            { required: true, message: "分类名不能为空" },
            { whitespace: true, message: "分类名不能为空" },
          ]}
        >
          <Input placeholder="请输入分类名称"></Input>
        </Form.Item>
      </Form>
    );
  }
}

export default AddForm;
