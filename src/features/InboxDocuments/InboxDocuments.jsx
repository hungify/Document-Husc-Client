import { Avatar, Card, Col, Divider, Empty, List, Row, Typography } from "antd";
import BadgeRibbonUrgent from "components/BadgeRibbonUrgent";
import SortFilter from "components/SortFilter";
import { dataSortFilterRadio } from "configs/sortFilter";
import {
  fetchInboxDocuments,
  setOrderBy,
  setPage,
} from "features/InboxDocuments/inboxDocumentsSlice";
import { getInboxDocuments } from "app/selectors/inbox";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardAnt = styled(Card)`
  transition: all 0.3s ease;
  padding-left: 0;
  padding-right: 0;
  border: 1px solid rgba(0, 0, 0, 0.24);
  background-color: ${(props) => (props.$isRead ? "white" : "rgba(65, 132, 228, 0.15)")};
  &:hover {
    filter: grayscale(0);
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

export default function InboxDocuments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inboxDocuments = useSelector(getInboxDocuments);

  React.useEffect(() => {
    dispatch(fetchInboxDocuments());
  }, [dispatch]);

  const handleRadioReceiverDocumentChange = (value) => {
    dispatch(setOrderBy(value));
  };

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
            dispatch(setPage(page));
          },
          pageSize: 10,
          showTotal: true,
          hideOnSinglePage: true,
        }}
        locale={{
          emptyText: <Empty description="Danh sách trống" />,
        }}
        dataSource={inboxDocuments}
        renderItem={(item) => (
          <BadgeRibbonUrgent
            text={item.urgentLevel.label}
            key={item._id}
            colorTag={item.urgentLevel.colorTag}
          >
            <CardAnt $isRead={item.isRead}>
              <Row align="middle" justify="space-between" onClick={() => navigate(`${item._id}`)}>
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
                          <Avatar>{item.from.username.charAt(0).toUpperCase()}</Avatar>
                        </Avatar.Group>
                      }
                      title={
                        <Link to={`${item._id}`}>
                          <Typography.Text strong>{item.title}</Typography.Text>
                        </Link>
                      }
                      description={
                        <Typography.Text type="secondary">
                          <Typography.Paragraph ellipsis={{ rows: 1 }}>
                            <Typography.Text type="secondary">
                              Từ: {item.from.username} - {item.from.email}
                            </Typography.Text>
                          </Typography.Paragraph>
                        </Typography.Text>
                      }
                    />
                  </List.Item>
                </Col>
                <Col span={24}>
                  <Typography.Paragraph ellipsis={{ rows: 3 }}>
                    {item?.summary || item?.content}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </CardAnt>
          </BadgeRibbonUrgent>
        )}
      />
    </Card>
  );
}
