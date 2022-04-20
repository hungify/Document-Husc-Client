import { Button, Drawer, Space } from "antd";
import React from "react";

export default function DrawerCustom({ visible, onCloseDrawer, children, ...restProps }) {
  return (
    <Drawer
      {...restProps}
      onClose={() => onCloseDrawer()}
      visible={visible}
      extra={
        <Space>
          <Button onClick={() => onCloseDrawer()}>Đóng</Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
}
