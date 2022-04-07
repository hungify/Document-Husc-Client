import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BulbFilled } from "@ant-design/icons";
import { Avatar, Col, List, Row, Tag, Typography } from "antd";
import DrawerRead from "features/Notifications/components/DrawerReader";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: rgba(65, 132, 228, 0.15);
  }
`;

export default function MailItem({ item }) {
  const { pathname } = useLocation();
  const pathnameList = pathname.split("/");
  const slug = pathnameList[pathnameList.length - 1];
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);

  const handleOpenDrawer = () => {
    setVisible(true);
  };

  const handleCloseDrawer = () => {
    setVisible(false);
  };
  return (
    <Container>
      <DrawerRead visible={visible} onCloseDrawer={handleCloseDrawer} />
      <Row align="middle" onClick={() => navigate(`detail/${item.id}`)}>
        {slug === "inbox" ? (
          <>
            <Col span={6}>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.from.avatar} />}
                  title={
                    <Link to={`detail/${item.id}`}>
                      <Typography.Text strong>{item.title}</Typography.Text>
                    </Link>
                  }
                  description={`Từ: ${item.from.email}`}
                />
              </List.Item>
            </Col>
            <Col span={9}>{item.message}</Col>
            <Col span={5}>
              <div onClick={handleOpenDrawer}>
                <Avatar.Group
                  maxCount={5}
                  maxPopoverTrigger="focus"
                  size="large"
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf", cursor: "pointer" }}
                >
                  {Array(20)
                    .fill(0)
                    .map((_, i) => (
                      <Avatar src="https://i.pravatar.cc/300" key={i} />
                    ))}
                </Avatar.Group>
              </div>
            </Col>
            <Col span={2}>
              <Tag color="red" icon={<BulbFilled />}>
                NEW
              </Tag>
            </Col>
            <Col span={2}>
              <Typography.Text>2 day ago</Typography.Text>
            </Col>
          </>
        ) : (
          <>
            <Col span={7}>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<Typography.Text strong>{item.title}</Typography.Text>}
                  description={`Đến: ${item.to.email}`}
                />
              </List.Item>
            </Col>
            <Col flex="auto">{item.myMessage}</Col>
            <Col flex="auto">Forward từ {item.publisher.email}</Col>
            <Col flex="auto">
              <Typography.Text>22/2/2022</Typography.Text>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}
