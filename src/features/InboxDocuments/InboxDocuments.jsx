import { Avatar, Card, Col, Divider, Empty, List, Row, Typography } from "antd";
import BadgeRibbonUrgent from "components/BadgeRibbonUrgent";
import SortFilter from "components/SortFilter";
import { dataSortFilterRadio } from "configs/sortFilter";
import { fetchInboxDocuments } from "features/InboxDocuments/inboxDocumentsSlice";
import { getInboxDocuments, getTotalInbox } from "app/selectors/inbox";
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
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [orderBy, setOrderBy] = React.useState("all");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inboxDocuments = useSelector(getInboxDocuments);
  const totalInbox = useSelector(getTotalInbox);

  React.useEffect(() => {
    dispatch(fetchInboxDocuments({ page, pageSize, orderBy }));
  }, [dispatch, page, pageSize, orderBy]);

  const handleRadioReceiverDocumentChange = (value) => {
    setOrderBy(value);
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
            setPage(page);
          },
          onShowSizeChange: (current, pageSize) => {
            setPageSize(pageSize);
          },
          defaultCurrent: page,
          showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} kết quả`,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showPrevNextJumpers: true,
          showTitle: true,
          total: totalInbox,
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
            <CardAnt $isRead={item.readDate}>
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
                          <Avatar>{item.from.avatar}</Avatar>
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
