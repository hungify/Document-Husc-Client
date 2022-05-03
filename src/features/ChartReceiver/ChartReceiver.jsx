import { Col, Row, Table } from "antd";
import { getDatasets, getReadAndUnread } from "app/selectors/documentDetails";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
ChartJS.register(ArcElement, Tooltip, Legend);

const columns = [
  {
    title: "Họ và tên",
    dataIndex: "username",
    sorter: (a, b) => a.username.length - b.username.length,
    sortDirections: ["descend"],
  },
  {
    title: "Thời gian xử lý",
    dataIndex: "readDate",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.readDate - b.readDate,
  },
];

export default function ChartReceiver() {
  const dataPie = useSelector(getDatasets);
  const readAndUnread = useSelector(getReadAndUnread);

  const dataChart = {
    labels: ["Đã xử lý", "Chưa xử lý"],
    datasets: [
      {
        label: "Số lượng xử lý văn bản",
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  dataChart.datasets[0].data = dataPie;

  const onChange = (pagination, filters, sorter, extra) => {};
  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Pie data={dataChart} width={420} height={420} options={{ maintainAspectRatio: false }} />
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={readAndUnread} onChange={onChange} />
      </Col>
    </Row>
  );
}
