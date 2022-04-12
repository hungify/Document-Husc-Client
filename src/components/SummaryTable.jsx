import { Col, Row, Table, Tag, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const RowAnt = styled(Row)`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const columns = [
  {
    title: "Cơ quan ban hành",
    dataIndex: "agency",
    key: "agency",
  },
  {
    title: "Số hiệu văn bản",
    dataIndex: "textNumber",
    key: "textNumber",
  },
  {
    title: "Ngày ban hành",
    dataIndex: "dateIssued",
    key: "dateIssued",
  },
  {
    title: "Người ký",
    dataIndex: "signer",
    key: "signer",
  },
  {
    title: "Tình trạng hiệu lực",
    dataIndex: "validityStatus",
    key: "validityStatus",
  },
  {
    title: "Mức độ khẩn",
    dataIndex: "degreeOfUrgency",
    key: "degreeOfUrgency",
    render: (text) => {
      if (text === "Bình thường") return <Tag color="green">Bình thường</Tag>;
      else if (text === "Khẩn cấp") return <Tag color="red">Khẩn</Tag>;
    },
  },
  {
    title: "Loại văn bản",
    key: "documentType",
    dataIndex: "documentType",
    render: (documentType) => (
      <>
        {documentType.map((tag) => {
          const color = tag.length > 5 ? "geekblue" : "green";
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

export default function SummaryTable({ documentData }) {
  return (
    <>
      <RowAnt>
        <Col span={24}>
          <Table columns={columns} dataSource={documentData} pagination={false} />
        </Col>
      </RowAnt>
      <RowAnt>
        <Col span={24}>
          <Typography.Title level={4}>Tóm tắt văn bản</Typography.Title>
          <Typography.Paragraph
            style={{
              fontSize: "17px",
              lineHeight: "1.5",
            }}
          >
            {documentData[0].summary}
          </Typography.Paragraph>
        </Col>
      </RowAnt>
    </>
  );
}
