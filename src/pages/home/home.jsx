import React from "react";
import { Card, Statistic, DatePicker, Timeline } from "antd";
import moment from "moment";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Chart, Line, Point, Tooltip, Legend, Interval } from "bizcharts";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
// 数据源
const data = [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 7,
  },
  {
    month: "Jan",
    city: "London",
    temperature: 3.9,
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 6.9,
  },
  {
    month: "Feb",
    city: "London",
    temperature: 4.2,
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 9.5,
  },
  {
    month: "Mar",
    city: "London",
    temperature: 5.7,
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 14.5,
  },
  {
    month: "Apr",
    city: "London",
    temperature: 8.5,
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 18.4,
  },
  {
    month: "May",
    city: "London",
    temperature: 11.9,
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 21.5,
  },
  {
    month: "Jun",
    city: "London",
    temperature: 15.2,
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 25.2,
  },
  {
    month: "Jul",
    city: "London",
    temperature: 17,
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 26.5,
  },
  {
    month: "Aug",
    city: "London",
    temperature: 16.6,
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 23.3,
  },
  {
    month: "Sep",
    city: "London",
    temperature: 14.2,
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 18.3,
  },
  {
    month: "Oct",
    city: "London",
    temperature: 10.3,
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 13.9,
  },
  {
    month: "Nov",
    city: "London",
    temperature: 6.6,
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 9.6,
  },
  {
    month: "Dec",
    city: "London",
    temperature: 4.8,
  },
];

const scale = {
  temperature: { min: 0 },
  city: {
    formatter: (v) => {
      return {
        London: "伦敦",
        Tokyo: "东京",
      }[v];
    },
  },
};
const data2 = [
  { month: "1 月", sales: 38 },
  { month: "2 月", sales: 52 },
  { month: "3 月", sales: 61 },
  { month: "4 月", sales: 45 },
  { month: "5 月", sales: 48 },
  { month: "6 月", sales: 38 },
  { month: "7 月", sales: 38 },
  { month: "8 月", sales: 38 },
  { month: "9 月", sales: 38 },
  { month: "10 月", sales: 38 },
  { month: "11 月", sales: 38 },
  { month: "12 月", sales: 38 },
];
export default function Home() {
  return (
    <Card>
      <div style={{ display: "flex", marginBottom: 24 }}>
        <Card
          title="商品总量"
          extra={<QuestionCircleOutlined />}
          style={{
            width: 300,
            height: 250,
          }}
        >
          <Statistic
            title="周销量"
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
          <Statistic
            title="日销量"
            value={9.3}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>

        <Chart
          scale={scale}
          padding={[30, 20, 60, 40]}
          autoFit
          height={250}
          data={data}
          // width={800}
          interactions={["element-active"]}
        >
          <Point position="month*temperature" color="city" shape="circle" />
          <Line
            shape="smooth"
            position="month*temperature"
            color="city"
            label="temperature"
          />
          <Tooltip shared showCrosshairs />
          <Legend
            background={{
              padding: [5, 100, 5, 36],
              style: {
                fill: "#eaeaea",
                stroke: "#fff",
              },
            }}
          />
        </Chart>
      </div>
      <Card
        title="访问量"
        extra={
          <RangePicker
            defaultValue={[
              moment("2019/01/01", dateFormat),
              moment("2019/06/01", dateFormat),
            ]}
            format={dateFormat}
          />
        }
        bodyStyle={{ display: "flex", justifyContent: "space-around" }}
      >
        <Card title="访问趋势" style={{ width: 600, marginRight: 50 }}>
          <Chart
            height={400}
            autoFit
            data={data2}
            interactions={["active-region"]}
            padding={[30, 30, 30, 50]}
          >
            <Interval position="month*sales" />
            <Tooltip shared />
          </Chart>
        </Card>
        <Card title="任务" style={{ width: 300 }}>
          {" "}
          <Timeline>
            <Timeline.Item color="green">新版本迭代会</Timeline.Item>
            <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
            <Timeline.Item color="red">
              <p>联调接口</p>
              <p>功能验收</p>
            </Timeline.Item>
            <Timeline.Item>
              <p>登录功能设计</p>
              <p>权限验证</p>
              <p>页面排版</p>
            </Timeline.Item>
          </Timeline>
        </Card>
      </Card>
    </Card>
  );
}
