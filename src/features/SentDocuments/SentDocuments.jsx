import { Avatar, Card, Col, List, Row, Typography } from "antd";
import BadgeRibbonUrgent from "components/BadgeRibbonUrgent";
import _ from "lodash";
import { mockDocumentListSent } from "mocks/sentDocument";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardAnt = styled(Card)`
  transition: all 0.3s ease;
  padding-left: 0;
  padding-right: 0;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: rgba(223, 223, 222, 0.4);
  }
`;

export default function SentDocuments() {
  const navigate = useNavigate();
  return (
    <Card size="small">
      <List
        size="small"
        pagination={{
          onChange: (page) => {},
          showTotal: true,
          hideOnSinglePage: true,
          pageSize: 10,
        }}
        dataSource={mockDocumentListSent}
        renderItem={(item) => (
          <BadgeRibbonUrgent text={item.urgentLevel}>
            <CardAnt>
              <Row align="middle" justify="space-between" onClick={() => navigate(`${item.key}`)}>
                <Col span={24}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar.Group
                          maxCount={2}
                          maxPopoverTrigger="click"
                          size="large"
                          maxStyle={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                            cursor: "pointer",
                          }}
                        >
                          <Avatar>K</Avatar>
                        </Avatar.Group>
                      }
                      title={
                        <Link to={`${item.key}`}>
                          <Typography.Text strong>{item.title}</Typography.Text>
                        </Link>
                      }
                      description={
                        <Typography.Text type="secondary">
                          <Typography.Paragraph ellipsis={{ rows: 1 }}>
                            <Typography.Text type="secondary">Đến: </Typography.Text>
                            {_.map(item.to, "name").join(", ")}
                          </Typography.Paragraph>
                        </Typography.Text>
                      }
                    />
                  </List.Item>
                </Col>
                <Col span={24}>
                  <Typography.Paragraph ellipsis={{ rows: 3 }}>{item.summary}</Typography.Paragraph>
                </Col>
              </Row>
            </CardAnt>
          </BadgeRibbonUrgent>
        )}
      />
    </Card>
  );
}
