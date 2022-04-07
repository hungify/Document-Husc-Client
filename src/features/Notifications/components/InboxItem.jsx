import { BulbFilled } from "@ant-design/icons";
import { Avatar, Col, List, Row, Tag, Typography } from "antd";
import DrawerRead from "features/Notifications/components/DrawerReader";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ColAnt = styled(Col)`
  :not(:first-child) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Wrapper = styled.div`
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: rgba(65, 132, 228, 0.15);
  }
`;

export default function InboxItem({ item, filterType }) {
  const [visible, setVisible] = React.useState(false);

  const handleOpenDrawer = () => {
    setVisible(true);
  };

  const handleCloseDrawer = () => {
    setVisible(false);
  };

  return (
    <Wrapper>
      <DrawerRead visible={visible} onCloseDrawer={handleCloseDrawer} />
      <Row align="middle">
        <ColAnt span={6}>
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
        </ColAnt>
        <Col span={8}>{item.message}</Col>
        <ColAnt span={5}>
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
        </ColAnt>
        <Col span={1}>
          <Tag color="red" icon={<BulbFilled />}>
            NEW
          </Tag>
        </Col>
        <ColAnt span={4}>
          <Typography.Text>2 day ago</Typography.Text>
        </ColAnt>
      </Row>
    </Wrapper>
  );
}
