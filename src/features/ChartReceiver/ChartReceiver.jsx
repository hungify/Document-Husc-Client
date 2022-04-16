import { Col, Row, Table } from "antd";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["Đã xử lý", "Chưa xử lý"],
  datasets: [
    {
      label: "Số lượng xử lý văn bản",
      data: [12, 19],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};
const dataProcessed = [];
for (let i = 0; i < 20; i++) {
  dataProcessed.push(
    {
      id: i,
      fullName: "Nguyễn Dũng",
      processedDate: "",
    },
    {
      id: i + 1,
      fullName: "Nguyễn Thị Phương",
      processedDate: `10:10 AM ${i + 9}/10/2020`,
    },
    {
      id: i + 2,
      fullName: "Đoàn Thị Hằng",
      processedDate: "10:10 AM 10/10/2020",
    },
    {
      id: i + 3,
      fullName: "Đinh Văn Hải",
      processedDate: "10:10 AM 12/10/2022",
    }
  );
}

export default function ChartReceiver() {
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ["descend"],
    },
    {
      title: "Thời gian xử lý",
      dataIndex: "processedDate",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.processedDate - b.processedDate,
    },
  ];
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Pie data={data} width={420} height={420} options={{ maintainAspectRatio: false }} />
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={dataProcessed} onChange={onChange} />
      </Col>
    </Row>
  );
}
