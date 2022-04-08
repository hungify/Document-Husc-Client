import {
  LoginOutlined,
  LogoutOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Col, Dropdown, Layout, Menu, Row, Space, Typography } from "antd";
import LogoHusc from "assets/images/logo/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
const HeaderAnt = styled(Layout.Header)`
  position: ${(props) => (props.shouldFixedHeader ? "fixed" : "relative")};
  z-index: 1;
  width: 100%;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
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

const notifications = (
  <Menu>
    <Menu.Item>
      <Link to="a">
        <Typography.Text strong>Nguyễn Văn Linh</Typography.Text> đã gửi cho bạn một văn bản.
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="a">
        <Typography.Text strong>Nguyễn Kim Toàn</Typography.Text> đã chuyển tiếp văn bản mà bản đang
        theo dõi.
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="a">
        <Typography.Text strong>Nguyễn Văn Linh</Typography.Text> đã đăng một thông báo mới cho mọi
        người.
      </Link>
    </Menu.Item>
  </Menu>
);

const profile = (
  <Menu>
    <Menu.Item key="1" icon={<SettingOutlined />}>
      <Link to="/update">Cập nhật tài khoản</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2" icon={<LogoutOutlined />}>
      <Link to="/logout">Đăng xuất</Link>
    </Menu.Item>
  </Menu>
);

export default function Header({ shouldFixedHeader }) {
  const { pathname } = useLocation();
  const [pathnameSplit] = React.useState(pathname.split("/"));

  return (
    <HeaderAnt theme={"light"} shouldFixedHeader={shouldFixedHeader}>
      <Row>
        <Col span={4}>
          <Link to="/">
            <Logo>
              <img src={LogoHusc} alt="logo" />
            </Logo>
          </Link>
        </Col>
        <Col span={6} offset={14}>
          <Menu mode="horizontal">
            {!pathnameSplit[1].includes("a") ? (
              <>
                <Menu.Item key="1">
                  <Space>
                    <LoginOutlined />
                    <Link to="/a/login">Đăng nhập</Link>
                  </Space>
                </Menu.Item>
                <Menu.Item key="1">
                  <Space>
                    <Link to="/n">User</Link>
                  </Space>
                </Menu.Item>
                <Menu.Item key="1">
                  <Space>
                    <Link to="/m">Quản lý</Link>
                  </Space>
                </Menu.Item>
              </>
            ) : (
              <Row>
                <Col>
                  <Menu.Item key="3">
                    <Dropdown overlay={notifications} placement="bottomRight">
                      <Badge count={3} offset={[-5, 5]}>
                        <Avatar
                          shape="circle"
                          size="large"
                          style={{
                            outline: "none",
                            border: "none",
                            background: "transparent",
                          }}
                        >
                          <NotificationOutlined
                            size="large"
                            style={{
                              color: "#000",
                            }}
                          />
                        </Avatar>
                      </Badge>
                    </Dropdown>
                  </Menu.Item>
                </Col>
                <Col>
                  <Menu.Item>
                    <Dropdown overlay={profile}>
                      <Space>
                        <Avatar />
                        <Typography.Text>Nguyễn Mạnh Hùng</Typography.Text>
                      </Space>
                    </Dropdown>
                  </Menu.Item>
                </Col>
              </Row>
            )}
          </Menu>
        </Col>
      </Row>
    </HeaderAnt>
  );
}
