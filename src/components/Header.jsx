import React from "react";
import styled from "styled-components";
import LogoHusc from "assets/images/logo/logo.svg";
import { Col, Layout, Menu, Row, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import { LoginOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
const HeaderAnt = styled(Layout.Header)`
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 5;
`;
const Logo = styled.div`
  float: left;
  width: 120px;
  height: 50px;
  margin: 0px 24px 20px 0;
  background: rgba(255, 255, 255, 0.3);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export default function Header() {
  const { pathname } = useLocation();
  const [pathnameSplit] = React.useState(pathname.split("/"));

  return (
    <HeaderAnt>
      <Row>
        <Col span={4}>
          <Link to="/">
            <Logo>
              <img src={LogoHusc} alt="logo" />
            </Logo>
          </Link>
        </Col>
        <Col span={16}>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">Sinh viên</Menu.Item>
            <Menu.Item key="2">Giảng viên</Menu.Item>
            <Menu.Item key="3">Cán bộ</Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            {!pathnameSplit[1].includes("a") ? (
              <Menu.Item key="1">
                <Space>
                  <UserOutlined />
                  <Link to="/a/login">Tài khoản</Link>
                </Space>
              </Menu.Item>
            ) : (
              <Menu.Item key="1">
                <Space>
                  <NotificationOutlined />
                  <Link to="/a/login">Thông báo</Link>
                </Space>
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    </HeaderAnt>
  );
}
