import { Button, Card, Table, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { Component, createRef } from "react";
import { reqCategorys } from "../../api/index";
import AddForm from "./components/add-form";

class Category extends Component {
  // constructor
  constructor(props) {
    super(props);
    // 定义分类状态
    this.state = {
      categorys: [], // 一级分类列表
      subCategorys: [], // 二级分类列表
      isLoading: false, // 是否加载
      parentId: 0, // 当前需要展示的分类列表的父ID
      parentName: "", // 当前需要展示的分类列表的父分类名

      isModalVisible: 0, // 对话框可见
    };

    /* 
    获取 添加 表单
  */
    this.addFormRef = createRef();
  }

  // 定义获取一级分类/二级分类的函数
  getCategory = async () => {
    const { parentId } = this.state;
    this.setState({
      isLoading: true,
    });
    let result = await reqCategorys(parentId);
    console.log(result);
    if (result.status === 0) {
      const categorys = result.data;
      // 取出分类数组 可能是一级的也可能是二级的
      if (parentId === 0) {
        // 如果父分类id为0说明是一级分类,否则是二级分类数组
        this.setState({
          categorys,
          isLoading: false,
        });
      } else {
        this.setState({
          subCategorys: categorys,
          isLoading: false,
        });
      }
    } else {
      message.error("分类列表请求失败");
    }
  };
  // 获取二级分类
  getSubCategorys = (category) => {
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        this.getCategory();
      }
    );
    // 状态更新只会重新渲染,就是调用 render ,其他生命周期或者定义的函数是不会重新执行的啊,所以这个地方还要调用获取分类的函数
  };
  /* 
    显示添加框
  */
  showAddModal = () => {
    this.setState({ isModalVisible: 1 });
  };
  /* 
    显示修改框
  */
  showUpdateModal = () => {
    this.setState({ isModalVisible: 2 });
  };
  /* 
    确认对话框
  */
  addCategory = () => {
    console.log("ok");
    this.setState({ isModalVisible: 0 });
  };

  updateCategory = () => {
    console.log("ok");
    this.setState({ isModalVisible: 0 });
  };
  /* 
    取消对话框
 */
  handleCancel = () => {
    this.setState({ isModalVisible: 0 });
  };
  // 初始数据
  initColumns = () => {
    // 定义 表格 列
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
      },
      {
        title: "操作",
        width: 300,
        render: (category) => (
          <>
            <Button
              onClick={this.showUpdateModal}
              type="link"
              size="small"
              style={{ marginRight: "10px" }}
            >
              修改分类
            </Button>
            {this.state.parentId === 0 ? (
              <Button
                type="link"
                size="small"
                onClick={() => this.getSubCategorys(category)}
              >
                查看子分类
              </Button>
            ) : null}
          </>
        ),
      },
    ];
  };
  // 生成表格初始列
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  // 获取分类
  componentDidMount() {
    this.getCategory();
  }
  /* 
    获取表单实例
  */
  getForm = (form) => {
    this.form = form;
    console.log(this.form);
  };
  render() {
    const {
      categorys,
      isLoading,
      subCategorys,
      parentId,
      parentName,
      isModalVisible,
    } = this.state;
    /* 
      定义在外面便于扩展
    */
    // Card 上左侧
    const title = (
      <>
        <Button
          style={{ fontSize: "16px" }}
          type="link"
          onClick={() => this.setState({ parentId: 0 })}
        >
          一级分类列表
        </Button>
        {parentId !== 0 ? (
          <span style={{ marginLeft: "-10px" }}>/ {parentName}</span>
        ) : null}
      </>
    );
    // Card 上右侧
    const extra = (
      <>
        {" "}
        <Button onClick={this.showAddModal} type="primary">
          <PlusOutlined />
          添加
        </Button>
      </>
    );
    return (
      <>
        <Card
          style={{ width: "100%", height: "100%" }}
          title={title}
          extra={extra}
        >
          <Table
            dataSource={parentId === 0 ? categorys : subCategorys}
            columns={this.columns}
            bordered={true}
            //想不到啊 表格边框属性时 bordered
            rowKey="_id"
            // 分页配置
            pagination={{
              defaultPageSize: 5,
            }}
            // 数据加载图标
            loading={isLoading}
          ></Table>
          {/* Modal 定义在这吧,还是两个,一个添加的,一个更新的 */}

          <Modal
            title="添加分类"
            visible={isModalVisible === 1}
            onOk={this.addCategory}
            onCancel={this.handleCancel}
          >
            <AddForm getForm={this.getForm}></AddForm>
          </Modal>

          <Modal
            title="更新分类"
            visible={isModalVisible === 2}
            onOk={this.updateCategory}
            onCancel={this.handleCancel}
          ></Modal>
        </Card>
      </>
    );
  }
}

export default Category;
