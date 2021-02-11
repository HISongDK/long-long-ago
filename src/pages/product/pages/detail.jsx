import { Button, Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { reqCategory } from "../../../api";
import { IMGS_URL } from "../../../utils/constants";

function Detail(props) {
  // 定义状态
  const [pcName, setPcName] = useState("");
  const [cName, setcName] = useState("");
  // 获取 参数 商品数据 //TODO:如果直接输入url跳转detail,没有传入状态,会报错
  const {
    name,
    price,
    desc,
    imgs,
    detail,
    pCategoryId,
    categoryId,
  } = props.location.state;
  console.log(props.location.state);

  /* 
    模拟生命周期
  */
  useEffect(() => {
    async function getCategoryInfo() {
      if (pCategoryId === "0") {
        const result = await reqCategory(categoryId);
        console.log(result);
        // 以下两种取值的方法,注意区别,
        // const {name}=result.data;
        const pcName = result.data.name;
        setPcName(pcName);
        // 这个更新状态名字弄错了,更新的是子分类名的状态,我说怎么一直有箭头
      } else {
        // const result1 = await reqCategory(pCategoryId);
        // const result2 = await reqCategory(categoryId);
        // console.log(result1, result2);
        // const pcName = result1.data.name;
        // const cName = result2.data.name;
        // setPcName(pcName);
        // setcName(cName);
        const result = await Promise.all([
          reqCategory(pCategoryId),
          reqCategory(categoryId),
        ]);
        const pcName = result[0].data.name;
        const cName = result[1].data.name;
        // 上面数组我怎么从 索引1 开始取值了,肯定是[0]开始啊
        setPcName(pcName);
        setcName(cName);
        console.log(result);
      }
    }
    getCategoryInfo();
  }, [pCategoryId, categoryId]);
  // 定义 Card 标题
  const title = (
    <>
      <Button type="link" onClick={() => props.history.goBack()}>
        <ArrowLeftOutlined
          // 点击箭头跳回商品首页
          style={{ fontSize: "20px", color: "green" }}
        />
      </Button>
      <span style={{ fontSize: "20px" }}>商品详情</span>
    </>
  );
  // 从 List 组件中解构出 Item
  const { Item } = List;
  return (
    <>
      <Card title={title}>
        <List>
          <Item>
            <span className="list-left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="list-left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="list-left">商品价格:</span>
            <span>{price}</span>
          </Item>
          <Item>
            <span className="list-left">所属分类:</span>
            <span>
              {pcName}
              {cName ? "-->" + cName : ""}
            </span>
          </Item>
          <Item>
            <span className="list-left">商品图片:</span>
            <span>
              {/*  http://localhost:5000/upload/image-1613055276329.jpg  */}
              {imgs.map((i) => (
                <img src={IMGS_URL + i} alt={i} key={i} className="images" />
              ))}
            </span>
          </Item>
          <Item>
            <span className="list-left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    </>
  );
}

export default Detail;
