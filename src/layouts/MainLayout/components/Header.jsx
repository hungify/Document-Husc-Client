import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Layout, Menu, Space, Typography } from "antd";
import { getToken, isAuthenticated } from "app/selectors/auth";
import LogoHusc from "assets/images/logo/logo.svg";
import BellIcon from "components/Icons/BellIcon";
import { fetchLogout } from "features/Auth/authSlice";
import useScrollPosition from "hooks/useScrollPosition";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProfile } from "app/selectors/profile";

const HeaderAnt = styled(Layout.Header)`
  position: ${(props) => (props.$shouldFixed ? "fixed" : "relative")};
  z-index: 10;
  width: 100%;
  transition: all 0.3s ease-in-out;
  box-shadow: ${(props) => (props.$positionY > 40 ? "rgba(0, 0, 0, 0.1) 0px 10px 50px" : "none")};
  background-color: ${(props) => (props.$positionY > 40 ? "rgba(248, 251, 250, 1)" : "#fff")};
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
const MenuSubMenuAnt = styled(Menu.SubMenu)`
  & .ant-menu-submenu-title {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
`;
const MenuItemAnt = styled(Menu.Item)`
  &:hover {
    background-color: #efefef;
  }
`;

const ButtonAnt = styled(Button)`
  &:focus,
  &:hover {
    background-color: transparent;
    color: #1890ff;
  }
`;
export default function Header({ shouldFixed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition();

  const isAuth = useSelector(isAuthenticated);
  const refreshToken = useSelector(getToken)?.refreshToken;
  const profile = useSelector(getProfile);

  const handleLogout = () => {
    dispatch(fetchLogout(refreshToken));
    if (!isAuth) navigate("/");
  };

  return (
    <HeaderAnt theme="light" $shouldFixed={shouldFixed} $positionY={scrollPosition}>
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
            <MenuSubMenuAnt
              key="notification"
              icon={
                <Badge dot>
                  <BellIcon />
                </Badge>
              }
            >
              <MenuItemAnt key="1">
                <Link to="a">
                  <Typography.Text strong>Nguyễn Văn Hưng</Typography.Text> đã gửi cho bạn một văn
                  bản.
                </Link>
              </MenuItemAnt>
              <MenuItemAnt key="2">
                <Link to="a">
                  <Typography.Text strong>Nguyễn Kim Toàn</Typography.Text> đã chuyển tiếp văn bản
                  mà bạn đang theo dõi.
                </Link>
              </MenuItemAnt>
              <MenuItemAnt key="3">
                <Link to="a">
                  <Typography.Text strong>Nguyễn Văn Linh</Typography.Text> đã phản hồi về văn bản
                  mà bạn đang theo dõi
                </Link>
              </MenuItemAnt>
              <MenuItemAnt key="4">
                <Link to="a">
                  <Typography.Text strong>Nguyễn Lý Thịnh</Typography.Text> đã xử lý văn bản mà bạn
                  đang theo dõi.
                </Link>
              </MenuItemAnt>
            </MenuSubMenuAnt>

            <Menu.SubMenu
              key="profile"
              icon={<Avatar>{profile.avatar}</Avatar>}
              title={<Typography.Text>{profile.username}</Typography.Text>}
            >
              <MenuItemAnt key="update-profile" icon={<SettingOutlined />}>
                <ButtonAnt type="text" onClick={() => navigate("profile")}>
                  Cập nhật tài khoản
                </ButtonAnt>
              </MenuItemAnt>
              <Menu.Divider />
              <MenuItemAnt key="logout" icon={<LogoutOutlined />}>
                <ButtonAnt type="text" onClick={handleLogout}>
                  Đăng xuất
                </ButtonAnt>
              </MenuItemAnt>
            </Menu.SubMenu>
          </Menu>
        ) : (
          <Space>
            <ButtonAnt
              type="text"
              size="large"
              icon={<UserOutlined />}
              onClick={() => navigate("login")}
            >
              Tài khoản
            </ButtonAnt>
          </Space>
        )}
      </WrapHeader>
    </HeaderAnt>
  );
}
