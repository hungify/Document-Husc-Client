import {
  LogoutOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Space, Typography } from "antd";
import { getToken, isAuthenticated } from "app/selectors/authSelector";
import LogoHusc from "assets/images/logo/logo.svg";
import { getLogout } from "features/Auth/authSlice";
import useScrollPosition from "hooks/useScrollPosition";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
const HeaderAnt = styled(Layout.Header)`
  position: ${(props) => (props.shouldFixedHeader ? "fixed" : "relative")};
  z-index: 1;
  width: 100%;
  transition: all 0.3s ease-in-out;
  box-shadow: ${(props) =>
    props.scrollPosition > 40 ? "rgba(0, 0, 0, 0.1) 0px 10px 50px" : "none"};
  background-color: ${(props) => (props.scrollPosition > 40 ? "rgba(248, 251, 250, 1)" : "#fff")};
`;
const WrapHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 60px;
    object-fit: contain;
  }
`;
const Title = styled.h1`
  margin-left: 10px;
  margin-bottom: 0;
`;

const Flex = styled.div`
  flex: 1 1 0%;
`;

export default function Header({ shouldFixedHeader }) {
  const isAuth = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const refreshToken = useSelector(getToken)?.refreshToken;
  const scrollPosition = useScrollPosition();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(getLogout(refreshToken));
    if (!isAuth) navigate("/");
  };

  const profile = (
    <Menu>
      <Menu.Item key="update-profile" icon={<SettingOutlined />}>
        <Link to="/update">Cập nhật tài khoản</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Button type="text" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Menu.Item>
    </Menu>
  );

  const notifications = (
    <Menu>
      <Menu.Item key="1">
        <Link to="a">
          <Typography.Text strong>Nguyễn Văn Hưng</Typography.Text> đã gửi cho bạn một văn bản.
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="a">
          <Typography.Text strong>Nguyễn Kim Toàn</Typography.Text> đã chuyển tiếp văn bản mà bản
          đang theo dõi.
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="a">
          <Typography.Text strong>Nguyễn Văn Linh</Typography.Text> đã phản hồi một văn bản mà bản
          đang theo dõi
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderAnt theme="light" shouldFixedHeader={shouldFixedHeader} scrollPosition={scrollPosition}>
      <WrapHeader>
        <div>
          <Link to="/">
            <Logo>
              <img src={LogoHusc} alt="logo" />
              <Title>Hệ thống tra cứu văn bản Đại học Khoa học Huế</Title>
            </Logo>
          </Link>
        </div>
        <Flex />
        {isAuth ? (
          <Menu mode="horizontal">
            <Menu.Item key="notification">
              <Dropdown overlay={notifications} placement="bottomRight">
                <Badge dot>
                  <NotificationOutlined style={{ fontSize: 18 }} />
                </Badge>
              </Dropdown>
            </Menu.Item>
            <Menu.Item key="profile">
              <Dropdown overlay={profile}>
                <Space>
                  <Avatar>N</Avatar>
                  <Typography.Text>Nguyễn Mạnh Hùng</Typography.Text>
                </Space>
              </Dropdown>
            </Menu.Item>
          </Menu>
        ) : (
          <Space>
            <Button
              type="text"
              size="large"
              icon={<UserOutlined />}
              onClick={() => navigate("login")}
            >
              Tài khoản
            </Button>
          </Space>
        )}
      </WrapHeader>
    </HeaderAnt>
  );
}
