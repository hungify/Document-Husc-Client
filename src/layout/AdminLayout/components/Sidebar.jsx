import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);

  const handleOnCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={handleOnCollapse} width={250}>
      <div className="logo" />
      <Menu theme="light" mode="inline" style={{ height: "100%", borderRight: 0 }}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Thông báo
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          Quản lý chuyên mục
        </Menu.Item>
        <Menu.Item key="4" icon={<VideoCameraOutlined />}>
          Quản lý loại văn bản
        </Menu.Item>
        <Menu.Item key="5" icon={<UploadOutlined />}>
          Quản lý cơ quan ban hành
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
