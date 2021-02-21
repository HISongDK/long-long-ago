import { Button, Card } from "antd";
import React, { Component } from "react";
import ReactECharts from "echarts-for-react";

class Bar extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    store: [9, 30, 42, 18, 21, 29],
  };
  getOption = (sales, store) => {
    return {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        // 显示数据分类
        data: ["销量", "库存"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        // 显示对应数据的数组
        {
          name: "销量",
          type: "line",
          data: sales,
        },
        {
          name: "库存",
          type: "line",
          data: store,
        },
      ],
    };
  };
  Update = () => {
    this.setState({
      sales: this.state.sales.map((item) => item - 5),
      store: this.state.store.reduce((pre, store) => {
        pre.push(store + 5);
        return pre;
      }, []),
    });
  };
  render() {
    const { sales, store } = this.state;
    return (
      <>
        <Card
          title={
            <Button onClick={this.Update} type="primary">
              更新
            </Button>
          }
        ></Card>
        <Card title="柱状图一">
          <ReactECharts option={this.getOption(sales, store)} />
        </Card>
      </>
    );
  }
}

export default Bar;
