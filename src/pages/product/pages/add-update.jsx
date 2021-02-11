import { Button, Card, Form, Input, Cascader } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { reqCategorys } from "../../../api/index";

const { Item } = Form;
const { TextArea } = Input;
/* 
  定义级联列表数据
*/
const optionLists = [];

function AddUpdate(props) {
  /* 
    根据state判断是否是修改
  */
  const product = props.location.state || {};
  // 设置级联默认显示数组
  const cascaderArr = [];
  if (product.pCategoryId === 0) {
    cascaderArr.push(product.categoryId);
  } else {
    cascaderArr.push(product.pCategoryId);
    cascaderArr.push(product.categoryId);
  }
  /* 
    表单数据 获取
  */
  // function onFinish(values) {
  //   console.log("success", values);
  // }
  function onFinish(values) {
    console.log("什么玩意", values);
  }
  /* 
    级联列表相关状态和回调
  */
  const [options, setOptions] = useState(optionLists); // 设定列表为数据状态

  // const onChange = (value, selectedOptions) => {
  //   console.log(value, selectedOptions);
  // };

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true; // 加载图标
    const { value } = targetOption; // 取出 value 值,发请求
    const result = await reqCategorys(value);
    console.log(result);

    // 判断如果有二级分类,就通过数据生成级联列表需要的对象格式
    if (result.data.length) {
      targetOption.loading = false;
      var childrenOptions = result.data.map((c) => ({
        label: c.name,
        value: c._id,
      }));

      targetOption.children = childrenOptions;
    } else {
      targetOption.isLeaf = true;
      targetOption.loading = false;
    }
    // 更新级联列表数据
    setOptions([...options]);
  };
  // 调接口
  useEffect(() => {
    (async function () {
      const result = await reqCategorys();
      // 通过获取的 商品分类 更新需要展示的状态
      let optionsArr = [];
      result.data.forEach((item) => {
        let obj = {};
        obj.label = item.name;
        obj.value = item._id;
        obj.isLeaf = false;
        optionsArr.push(obj);
      });
      // 只有修改页面才先判断展示
      if (product.pCategoryId && product.pCategoryId !== "0") {
        const child = await reqCategorys(product.pCategoryId);
        console.log(child);
        const childOptions = child.data.map((c) => ({
          value: c._id,
          label: c.name,
          isLeaf: true,
        }));
        console.log(childOptions);
        // 找出与之前商品对应的一级 option 对象
        let targetOptions = optionsArr.find(
          (c) => c.value === product.pCategoryId
        );
        targetOptions.children = childOptions;
      }
      setOptions(optionsArr);
    })();
  }, []);
  /* 
    定义 Form.Item 的布局 配置对象
  */
  const ItemLayout = {
    labelCol: { span: "3" },
    wrapperCol: { span: "8" },
  };
  /* 
    自定义价格校验函数    
  */
  function validator(r, v) {
    return new Promise((res, rej) => {
      if (!v) {
        rej("此项必填");
      }
      if (v < 0) {
        rej("商品价格不能小于0");
      }
      //  else if (!v) {
      //   rej("此项必填");
      // }
      res();
      // 我可太想不到了,button submit一直触发不了onFinis回调,莫名其妙的,找了半天看官方文档onFinish后面说得提交还得校验成功才能触发.然后就想着肯定是这个自定义校验没调用成功的结果,果然啊
      // 结论,莫名其妙的错误最好看看相关内容的文档去
    });
  }

  return (
    <>
      <Card
        style={{ height: "100%" }}
        title={
          <>
            <Button
              onClick={() => props.history.goBack()}
              type="link"
              style={{ fontSize: "20px" }}
            >
              <ArrowLeftOutlined />
            </Button>
            <span style={{ fontSize: "20px" }}>
              {product.name ? "修改商品" : "添加商品"}
            </span>
          </>
        }
      >
        <Form
          initialValues={
            product
              ? {
                  name: product.name,
                  desc: product.desc,
                  price: product.price,
                  category: cascaderArr,
                }
              : null
          }
          name="form"
          onFinish={onFinish}
          {...ItemLayout}
        >
          <Item
            name="name"
            label="商品名称"
            rules={[{ required: true, message: "此项必填" }]}
            // Form.item 校验必须要有 name 属性才行
          >
            <Input></Input>
          </Item>
          <Item
            name="desc"
            label="商品描述"
            rules={[{ required: true, message: "此项必填" }]}
          >
            <TextArea
              placeholder="请输入商品描述"
              autoSize={{ minRows: 2, maxRows: 6 }}
            ></TextArea>
            {/* 多行文本域,, autoSize 可以自动变换大小,不出滚动条 ,没有配置对象,默认一行 */}
          </Item>
          <Item
            name="price"
            label="商品价格"
            rules={[
              { required: true, message: "" },
              { validator: (rule, value) => validator(rule, value) },
            ]}
          >
            <Input type="number" addonAfter="元"></Input>
          </Item>
          <Item
            name="category"
            label="商品分类"
            rules={[{ required: true, message: "此项必填" }]}
          >
            <Cascader
              options={options} // 需要显示的数据
              loadData={loadData} // 选中一级列表后,加载二级数据的回调
              // onChange={onChange}
              // changeOnSelect
            />
          </Item>
          <Item name="img" label="商品图片">
            <Input></Input>
          </Item>
          <Item name="detail" label="商品详情">
            <Input></Input>
          </Item>
          <Item>
            <Button htmlType="submit" type="primary">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    </>
  );
}

export default AddUpdate;
