import { Button, Card, Table, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import {
  reqAddCategory,
  reqCategorys,
  reqUpdateCategory,
} from "../../api/index";
import AddForm from "./components/add-form";
import UpdateForm from "./components/update-form";
import memoryUtil from "../../utils/memoryUtil";
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
      updateData: {},
    };
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
        // 先给内存工具一份,好添加显示 下拉框选项,减少ajax请求
        memoryUtil.categorys = categorys;
        // 如果父分类id为0说明是一级分类,否则是二级分类数组
        this.setState({
          categorys,
          isLoading: false,
        });
      } else {
        // memoryUtil.categorys = categorys;
        // 这个不用存了,不用改变添加框下拉框的东西,就是改一个默认选项就行,没必要这么弄
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
  showUpdateModal = (category) => {
    console.log(category);
    this.setState({ isModalVisible: 2 });
    this.setState({
      updateData: category,
    });
    // 获取修改分类时,需要的回显数据,主要名字传入 updateCategory 组件
    this.updateCategoryData = category;
    // 获取修改子分类名的 id
    this.currentCategoryId = category._id;
    /* 
      以上注释是因为有时候写的乱七八糟,后来改思路,以为没有就给删除了
      后来又出错补了回来
      所以随时写注释还是很重要的
    */
  };
  /* 
    确认对话框
  */
  addCategory = async () => {
    console.log(this.addForm);
    let result = this.addForm.getFieldsValue();
    console.log(result);
    // this.setState({ isModalVisible: 0 });
    if (result.categoryName && result.categoryName.trim()) {
      // 判断是否有 值,且值去掉首尾空格是否还存在(是否全空)
      const response = await reqAddCategory(
        result.parentId,
        result.categoryName
      );
      if (response.status === 0) {
        message.success("添加分类成功");
        this.setState({
          isModalVisible: 0,
        });
        this.getCategory();
      } else {
        message.error("添加分类失败");
      }
    } else {
      message.error("请输入分类名");
    }
  };

  updateCategory = async () => {
    const categoryId = this.currentCategoryId;
    let value = this.updateForm.getFieldsValue();
    const { categoryName } = value;
    if (categoryName && categoryName.trim()) {
      const result = await reqUpdateCategory({ categoryId, categoryName });
      // 传参需谨慎,一不小心.最好就不要定义成这种对象,起始还是我的问题,就记住了,不过怎么回事,传参,名字都一样就行了,解构赋值就不岔劈了

      console.log(result);

      if (result.status === 0) {
        this.getCategory();
        message.success("修改分类成功");
        this.setState({
          isModalVisible: 0,
        });
      } else {
        message.error("更改分类失败");
      }
    } else {
      message.error("请输入用户名");
    }
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
              onClick={() => this.showUpdateModal(category)}
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
    render () 
  */
  render() {
    const {
      categorys,
      isLoading,
      subCategorys,
      parentId,
      parentName,
      isModalVisible,
    } = this.state;
    const { updateCategoryData } = this;
    /* 
      定义在外面便于扩展
    */
    // Card 上左侧
    const title = (
      <>
        <Button
          style={{ fontSize: "16px" }}
          type="link"
          onClick={() => {
            this.setState({ parentId: 0 });
            this.getCategory();
          }}
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
            okText="添加"
            cancelText="取消"
            destroyOnClose={true}
          >
            <AddForm
              getForm={(form) => (this.addForm = form)}
              parentId={parentId}
            ></AddForm>
          </Modal>

          <Modal
            title="更新分类"
            visible={isModalVisible === 2}
            okText="修改"
            cancelText="取消"
            onOk={this.updateCategory}
            onCancel={this.handleCancel}
            destroyOnClose={true}
          >
            <UpdateForm
              disappearBack={updateCategoryData}
              getUpdateForm={(form) => (this.updateForm = form)}
            ></UpdateForm>
          </Modal>
        </Card>
      </>
    );
  }
}

export default Category;
