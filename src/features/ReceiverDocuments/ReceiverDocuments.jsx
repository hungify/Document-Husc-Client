import { Avatar, Card, Col, Divider, List, Row, Typography } from "antd";
import BadgeRibbonUrgent from "components/BadgeRibbonUrgent";
import SortFilter from "components/SortFilter";
import { dataSortFilterRadio } from "configs/sortFilter";
import { mockDocumentListInbox } from "mocks/inboxDocuments";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardAnt = styled(Card)`
  transition: all 0.3s ease;
  padding-left: 0;
  padding-right: 0;
  border: 1px solid rgba(0, 0, 0, 0.24);
  background-color: ${(props) => (props.isRead ? "white" : "rgba(65, 132, 228, 0.15)")};
  &:hover {
    filter: grayscale(0);
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

export default function ReceiverDocuments() {
  const navigate = useNavigate();

  const handleRadioReceiverDocumentChange = (value) => {};

  return (
    <Card size="small">
      <SortFilter
        dataRadio={dataSortFilterRadio}
        onRadioChange={handleRadioReceiverDocumentChange}
      />
      <Divider />
      <List
        size="small"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={mockDocumentListInbox}
        renderItem={(item) => (
          <BadgeRibbonUrgent text={item.urgentLevel} key={item.key}>
            <CardAnt isRead={item.isRead}>
              <Row
                align="middle"
                justify="space-between"
                onClick={() => navigate(`${item.key}`)}
              >
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
                            <Typography.Text type="secondary">Từ: {item.from.name}</Typography.Text>
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
