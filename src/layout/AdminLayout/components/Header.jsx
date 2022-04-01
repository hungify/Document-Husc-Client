import { Col, Layout, Menu, Row } from "antd";
import React from "react";

export default function Header() {
  return (
    <Layout.Header
      className="header"
      style={{
        background: "#fff",
      }}
    >
      <Row>
        <Col span={12}>
          <div className="logo">Trường đại học khoa học Huế</div>
        </Col>
        <Col span={12}>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">Profile</Menu.Item>
            <Menu.Item key="2">Notification</Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Layout.Header>
  );
}
