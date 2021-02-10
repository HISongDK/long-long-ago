import { Button, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";

function AddUpdate(props) {
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
            <span style={{ fontSize: "20px" }}>添加商品</span>
          </>
        }
      ></Card>
    </>
  );
}

export default AddUpdate;
