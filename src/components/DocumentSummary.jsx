import { Col, Row, Table, Tag, Typography, Card, Empty } from "antd";
import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import _ from "lodash";

const CardEmpty = styled(Card)`
  background-color: rgb(248, 250, 252);
  color: rgba(0, 0, 0, 0.25);
`;

const RowAnt = styled(Row)`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export default function DocumentSummary({ dataSource }) {
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
      key: "issueDate",
      title: "Ngày ban hành",
    },
    {
      key: "agency",
      title: "Cơ quan ban hành",
    },
    {
      key: "category",
      title: "Chuyên mục",
    },
  ];

  const columns = keyShouldShow.map((item) => {
    if (dataSource.hasOwnProperty(item.key)) {
      return {
        title: item.title,
        dataIndex: item.key,
        key: item.key,
        render: (text) => {
          if (item.key === "urgentLevel") {
            return (
              <Tag color={text.colorTag} key={text.value}>
                {text.label}
              </Tag>
            );
          } else if (item.key === "issueDate") {
            return dayjs(text).format("DD/MM/YYYY");
          } else if (item.key === "category") {
            return text.title;
          }
          return text.label || text;
        },
      };
    }
  });

  return (
    <>
      <RowAnt>
        <Col span={24}>
          {_.isEmpty(dataSource) ? (
            <CardEmpty key="empty">
              <Empty description="Danh sách trống" />
            </CardEmpty>
          ) : (
            <Table columns={columns} dataSource={[dataSource]} pagination={false} bordered />
          )}
        </Col>
      </RowAnt>
      <RowAnt gutter={[0, 10]}>
        <Col span={24}>
          <Typography.Title level={4}>Tiêu đề</Typography.Title>
          <Typography.Text
            style={{
              fontSize: "17px",
              lineHeight: "1.5",
            }}
          >
            {dataSource.title}
          </Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>Tóm tắt văn bản</Typography.Title>
          <Typography.Paragraph
            style={{
              fontSize: "17px",
              lineHeight: "1.5",
            }}
          >
            {dataSource.summary}
          </Typography.Paragraph>
        </Col>
      </RowAnt>
    </>
  );
}
