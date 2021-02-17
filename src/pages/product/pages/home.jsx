import { Button, Card, Input, Select, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import {
  reqProducts,
  reqSearchProducts,
  reqUpdateStatus,
} from "../../../api/index";
import { PAGE_SIZE } from "../../../utils/constants";

function ProductHome(props) {
  /* 
  定义状态
*/
  const [products, setProducts] = useState([]); // 定义表格数据源,商品数组
  const [total, setTotal] = useState(0); // 定义总页数状态
  const [loading, setLoading] = useState(false); // 定义加载状态
  const [searchType, setSearchType] = useState("productName");
  const [searchName, setSearchName] = useState("");
  const [pn, setPn] = useState(1); // 定义一下页码
  const columns = [
    // 定义表格 列格式,及指定数据
    { title: "商品名称", dataIndex: "name" },
    { title: "商品描述", dataIndex: "desc" },
    { title: "价格", dataIndex: "price", render: (price) => "￥" + price },
    {
      title: "状态",
      width: 100,
      // dataIndex: "status",// 忘了删掉这行了
      render: (product) => (
        <>
          <Button
            onClick={() => updateStatus(product)}
            type={product.status === 1 ? "ghost" : "primary"}
          >
            {product.status === 1 ? "下架" : "上架"}
          </Button>
          <span>{product.status === 1 ? "在售" : "已下架"}</span>
        </>
      ),
    },
    {
      title: "操作",
      width: 100, //给表格列指定宽度真挺好
      render: (rowProduct) => (
        <>
          <Button
            onClick={() =>
              props.history.push({
                pathname: "/product/detail",
                state: rowProduct,
                // 函数式路由跳转传参 state
              })
            }
            type="link"
          >
            详情
          </Button>
          <Button
            onClick={() => props.history.push("/product/add", rowProduct)}
            // state 传参,直接第一个参数pathname,第二个参数state
            type="link"
          >
            修改
          </Button>
        </>
      ),
    },
  ];
  // 定义上架下架 回调函数
  async function updateStatus(product) {
    console.log(product);
    let { status, _id } = product;
    status = status === 1 ? 2 : 1;
    // 直接发请求就好,更改状态
    reqUpdateStatus(_id, status);
    // 更改某商品状态之后,要立即更新一下商品数据
    getProducts(pn);
  }
  /* 
  发送请求获取数据
*/
  async function getProducts(pageNum) {
    setLoading(true);
    // if (!pageNum) pageNum = 1;
    // TODO:不知道为什么这个 pageNum 是有判断语句或者三目运算符,下面的值都是一个莫名其面的对象

    // 判断是否填写过 搜索框 如果有值,再调用此函数就是搜索
    let result;
    let searchData = {
      pageNum,
      pageSize: PAGE_SIZE,
      searchName,
      searchType,
    };
    console.log(searchData);
    if (searchName) {
      result = await reqSearchProducts(searchData);
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE);
    }

    console.log(result);
    if (result.status === 0) {
      setProducts(result.data.list);
      setTotal(result.data.total);

      setLoading(false);
    }
  }
  useEffect(() => {
    getProducts(1);
    // TODO:这个我属实是不知道怎么回事,之前也是总有依赖项警告
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* 
    搜索数据
  */

  /* 
    定义 Card 组件卡片头部结构
  */
  const title = (
    <>
      <Select
        style={{ width: "150px" }}
        value={searchType}
        onChange={(v) => {
          setSearchType(v);
        }}
      >
        <Select.Option value="productName">按名称搜索</Select.Option>
        <Select.Option value="productDesc">按描述搜索</Select.Option>
      </Select>
      <Input
        value={searchName}
        onChange={(v) => setSearchName(v.currentTarget.value)}
        placeholder="关键字"
        style={{ width: "180px", margin: "0 20px" }}
      ></Input>
      <Button onClick={() => getProducts(1)} type="primary">
        搜索
      </Button>
    </>
  );
  const extra = (
    <>
      <Button onClick={() => props.history.push("/product/add")} type="primary">
        <PlusOutlined></PlusOutlined> 添加商品
      </Button>
    </>
  );

  /* 
    页面渲染结构
  */
  return (
    <>
      <Card title={title} extra={extra}>
        <Table
          dataSource={products}
          columns={columns}
          bordered={true}
          rowKey="_id" // 指定每行 key 值对应的数据源中属性名
          // 分页器
          pagination={{
            current: pn, // 有个bug 需要设置这个属性
            total,
            showQuickJumper: true,
            pageSize: PAGE_SIZE,
            onChange: (v) => {
              getProducts(v);
              setPn(v);
            },
          }}
          // 加载时图标
          loading={loading}
        ></Table>
      </Card>
    </>
  );
}

export default ProductHome;
