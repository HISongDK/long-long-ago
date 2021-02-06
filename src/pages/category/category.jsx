import { Button, Card, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { Component } from "react";

class Category extends Component {
  constructor(props) {
    super(props);
    this.dataSource = [
      {
        key: "1",
        name: "胡彦斌",
        operate: 32,
      },
      {
        key: "2",
        name: "胡彦祖",
        operate: 42,
      },
    ];
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
      },
    ];
  }
  render() {
    /* 
      定义在外面便于扩展
    */
    // Card 上左侧
    const title = "一级分类列表";
    // Card 上右侧
    const extra = (
      <Button type="primary">
        <PlusOutlined />
        添加
      </Button>
    );
    return (
      <>
        <Card
          style={{ width: "100%", height: "100%" }}
          title={title}
          extra={extra}
        >
          <Table
            dataSource={this.dataSource}
            columns={this.columns}
            bordered="true"
            //想不到啊 表格边框属性时 bordered
          ></Table>
        </Card>
      </>
    );
  }
}

export default Category;
