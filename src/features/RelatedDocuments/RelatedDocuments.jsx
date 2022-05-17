import { Avatar, Card, Col, Empty, List, Row, Space, Typography } from "antd";
import BadgeRibbonUrgency from "components/BadgeRibbonUrgent";
import FileList from "components/FileList";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WrapCard = styled(Card)`
  background-color: rgba(248, 250, 252, 1);
`;

const CardItemAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

export default function RelatedDocuments({ dataSource }) {
  return (
    <WrapCard bordered={false}>
      <List
        itemLayout="vertical"
        size="default"
        dataSource={dataSource}
        pagination={{
          pageSize: 10,
          defaultCurrent: 1,
          hideOnSinglePage: true,
          onChange: (page) => {},
        }}
        locale={{
          emptyText: <Empty description="Danh sách trống" />,
        }}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <BadgeRibbonUrgency text={item.urgentLevel.label}>
              <CardItemAnt bordered={false}>
                <Row align="middle" justify="space-between">
                  <Col span={24}>
                    <List.Item.Meta
                      avatar={<Avatar size="large">{item.publisher?.avatar ?? "?"}</Avatar>}
                      title={<Link to={`/detail/${item._id}?tab=property`}>{item.title}</Link>}
                    />
                  </Col>
                  <Col span={8}>
                    <Space direction="vertical">
                      <Typography.Text>
                        Số hiệu văn bản:&nbsp;
                        <Typography.Text strong>{item.documentNumber}</Typography.Text>
                      </Typography.Text>
                      <Typography.Text>
                        Người ký:&nbsp;
                        <Typography.Text strong>{item.signer}</Typography.Text>
                      </Typography.Text>
                    </Space>
                  </Col>
                  <Col span={8}>
                    <Space direction="vertical">
                      <Typography.Text>
                        Ngày Ban hành:&nbsp;
                        <Typography.Text strong>
                          {dayjs(item.issueDate).format("DD/MM/YYYY")}
                        </Typography.Text>
                      </Typography.Text>

                      <Typography.Text>
                        Cơ quan ban hành:&nbsp;
                        <Typography.Text strong>{item.agency.label}</Typography.Text>
                      </Typography.Text>
                    </Space>
                  </Col>
                  <Col span={8}>
                    <FileList files={item.fileList} direction="vertical" />
                  </Col>
                </Row>
              </CardItemAnt>
            </BadgeRibbonUrgency>
          </List.Item>
        )}
      />
    </WrapCard>
  );
}
