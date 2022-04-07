import {
  AntDesignOutlined,
  BulbFilled,
  BulbTwoTone,
  SafetyCertificateFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, List, Row, Tag, Tooltip, Typography } from "antd";
import DrawerRead from "features/Notifications/components/DrawerRead";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RowAnt = styled(Row)`
  align-items: center;
`;
const ColAnt = styled(Col)`
  :not(:first-child) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const ListItemAnt = styled(List.Item)`
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: rgba(65, 132, 228, 0.15);
  }
`;

export default function InboxItem({ item }) {
  const [visible, setVisible] = React.useState(false);

  const handleOpenDrawer = () => {
    setVisible(true);
  };

  const handleCloseDrawer = () => {
    setVisible(false);
  };

  return (
    <>
      <DrawerRead visible={visible} onCloseDrawer={handleCloseDrawer} />
      <ListItemAnt>
        <RowAnt>
          <ColAnt span={14}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={
                <Link to={`detail/${item.id}`}>
                  <Typography.Text strong>{item.title}</Typography.Text>
                </Link>
              }
              description={item.summary}
            />
          </ColAnt>
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
        </RowAnt>
      </ListItemAnt>
    </>
  );
}
