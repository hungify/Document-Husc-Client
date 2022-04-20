import { Col, Row, Table, Tag, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const RowAnt = styled(Row)`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export default function DocumentSummary({ documentData }) {
  const keyShouldShow = [
    {
      key: "documentNumber",
      title: "Số hiệu văn bản",
    },
    {
      key: "typesOfDocument",
      title: "Loại văn bản",
    },
    {
      key: "signer",
      title: "Người ký",
    },
    {
      key: "urgentLevel",
      title: "Độ khẩn cấp",
    },
    {
      key: "dateIssued",
      title: "Ngày ban hành",
    },
    {
      key: "authorityIssued",
      title: "Cơ quan ban hành",
    },
    {
      key: "category",
      title: "Chuyên mục",
    },
  ];

  const columns = keyShouldShow.map((item) => {
    if (documentData.hasOwnProperty(item.key)) {
      return {
        title: item.title,
        dataIndex: item.key,
        key: item.key,
        render: (text) => {
          if (item.key === "urgentLevel") {
            return (
              <Tag color={text === "Bình thường" ? "green" : "red"} key={text}>
                {text}
              </Tag>
            );
          }
          return text;
        },
      };
    }
  });

  return (
    <>
      <RowAnt>
        <Col span={24}>
          <Table columns={columns} dataSource={[documentData]} pagination={false} bordered />
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
            {documentData.summary}
          </Typography.Paragraph>
        </Col>
      </RowAnt>
    </>
  );
}
