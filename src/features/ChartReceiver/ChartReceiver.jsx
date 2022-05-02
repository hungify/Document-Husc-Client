import { Col, Row, Table } from "antd";
import { getDatasets } from "app/selectors/documentDetails";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
ChartJS.register(ArcElement, Tooltip, Legend);

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

const dataChart = {
  labels: ["Đã xử lý", "Chưa xử lý"],
  datasets: [
    {
      label: "Số lượng xử lý văn bản",
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
for (let i = 0; i < 10; i++) {
  dataProcessed.push(
    {
      key: uuidV4(),
      fullName: "Nguyễn Dũng",
      processedDate: "",
    },
    {
      key: uuidV4(),
      fullName: "Nguyễn Thị Phương",
      processedDate: `10:10 AM ${i + 9}/10/2020`,
    },
    {
      key: uuidV4(),
      fullName: "Đoàn Thị Hằng",
      processedDate: "10:10 AM 10/10/2020",
    },
    {
      key: uuidV4(),
      fullName: "Đinh Văn Hải",
      processedDate: "10:10 AM 12/10/2022",
    }
  );
}

export default function ChartReceiver() {
  const dataPie = useSelector(getDatasets);

  dataChart.datasets[0].data = [dataPie.read || 0, dataPie.unread || 0];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Pie data={dataChart} width={420} height={420} options={{ maintainAspectRatio: false }} />
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={dataProcessed} onChange={onChange} />
      </Col>
    </Row>
  );
}
