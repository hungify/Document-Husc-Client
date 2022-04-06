import { Button, Drawer, Space } from "antd";
import React from "react";

export default function DrawerCustom(props) {
  const { visible, onCloseDrawer } = props;
  return (
    <Drawer
      {...props}
      onClose={() => onCloseDrawer()}
      visible={visible}
      extra={
        <Space>
          <Button onClick={() => onCloseDrawer()}>Đóng</Button>
        </Space>
      }
    >
      {props.children}
    </Drawer>
  );
}
