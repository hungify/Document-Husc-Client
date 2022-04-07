import { Avatar, Button, Card, Col, Drawer, Space, Typography } from "antd";
import DrawerCustom from "components/DrawerCustom";
import React from "react";
import styled from "styled-components";

const CardAnt = styled(Card)`
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.06);
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  }
`;

export default function DrawerReader({ visible, onCloseDrawer }) {
  return (
    <DrawerCustom
      title="Số người xem"
      placement="right"
      onCloseDrawer={onCloseDrawer}
      visible={visible}
    >
      <Card title={<Typography.Text strong>Danh sách người đã xem (20)</Typography.Text>}>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <CardAnt size="small" key={i}>
              <Card.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<Typography.Text strong>Nguyễn Văn {i}</Typography.Text>}
                description={<Typography.Text code>{i} hour ago</Typography.Text>}
              />
            </CardAnt>
          ))}
      </Card>
    </DrawerCustom>
  );
}
