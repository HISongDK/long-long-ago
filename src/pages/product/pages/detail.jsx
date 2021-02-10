import { Button, Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { reqCategory } from "../../../api";

function Detail(props) {
  // 定义状态
  const [pcName, setPcName] = useState("");
  const [cName, setcName] = useState("");
  // 获取 参数 商品数据 //TODO:如果直接输入url跳转detail,没有传入状态,会报错
  const {
    name,
    price,
    desc,
    img,
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
        const pcName = result[1].data.name;
        const cName = result[2].data.name;
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
            <div>
              <span className="list-left">商品名称:</span>
              <span>{name}</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="list-left">商品描述:</span>
              <span>{desc}</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="list-left">商品价格:</span>
              <span>{price}</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="list-left">所属分类:</span>
              <span>
                {pcName}
                {cName ? "-->" + cName : ""}
              </span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="list-left">商品图片:</span>
              <span>
                <img src={img} alt="" />
              </span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="list-left">商品详情:</span>
              <span dangerouslySetInnerHTML={{ __html: detail }}></span>
            </div>
          </Item>
        </List>
      </Card>
    </>
  );
}

export default Detail;
