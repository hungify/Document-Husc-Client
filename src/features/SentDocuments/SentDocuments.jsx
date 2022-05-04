import { Avatar, Card, Col, Empty, List, Row, Typography } from "antd";
import { getSentDocuments } from "app/selectors/sent";
import BadgeRibbonUrgent from "components/BadgeRibbonUrgent";
import { fetchSentDocuments } from "features/SentDocuments/sentDocumentsSlice";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sentDocuments = useSelector(getSentDocuments);

  React.useEffect(() => {
    dispatch(fetchSentDocuments({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  return (
    <Card size="small">
      <List
        size="small"
        pagination={{
          onChange: (page) => {
            setPage(page);
          },
          onShowSizeChange: (current, size) => {
            setPageSize(size);
          },
          showTotal: true,
          hideOnSinglePage: true,
          pageSize: pageSize,
        }}
        locale={{
          emptyText: <Empty description="Danh sách trống" />,
        }}
        dataSource={sentDocuments}
        renderItem={(item) => (
          <BadgeRibbonUrgent
            text={item.urgentLevel.label}
            colorTag={item.urgentLevel.colorTag}
            key={item._id}
          >
            <CardAnt>
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
                          <Avatar>k</Avatar>
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
                            <Typography.Text type="secondary">Đến: </Typography.Text>
                            {item.isPublic
                              ? "Ban hành công khai"
                              : _.map(item.to, "email").join(", ")}
                          </Typography.Paragraph>
                        </Typography.Text>
                      }
                    />
                  </List.Item>
                </Col>
                <Col span={24}>
                  <Typography.Paragraph ellipsis={{ rows: 3 }}>
                    {item.summary || item.content}
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
