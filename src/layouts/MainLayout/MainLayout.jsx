import { Layout } from "antd";
import { getRole, isAuthenticated } from "app/selectors/auth";
import { menuConfig } from "configs/menu";
import { ROLES } from "configs/roles";
import BreadcrumbTrail from "layouts/MainLayout/components/BreadcrumbTrail";
import Header from "layouts/MainLayout/components/Header";
import MenuNavigation from "layouts/MainLayout/components/MenuNavigation";
import Sidebar from "layouts/MainLayout/components/Sidebar";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LayoutMain = styled(Layout)`
  margin-top: 64px;
  padding: ${(props) => (props.$isAuth ? "0" : "0 60px")};
`;

const LayoutWrapContent = styled(Layout)`
  margin-left: ${(props) => (props.$collapsed ? "80px" : props.$isAuth ? "250px" : "0")};
`;

const ContentAnt = styled(Layout.Content)`
  padding: 0 15px;
`;

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthenticated);
  const role = useSelector(getRole);
  const { pathname } = useLocation();
  const path = pathname.split("/").filter((item) => item);

  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState();
  const [menuItems, setMenuItems] = React.useState(menuConfig.GUEST);

  React.useEffect(() => {
    if (path.length > 2) {
      setActiveKey(path[0]);
    } else {
      setActiveKey(path[path.length - 1]);
    }
  }, [path]);

  React.useEffect(() => {
    const menuUser = menuConfig.USER;
    if (isAuth && role === ROLES.ADMIN) {
      const menuAdmin = menuConfig.ADMIN;
      const menuAdminGroup = menuAdmin.map((item) => {
        if (item.key === "lookup-operates") {
          const newGroup = [...menuUser, ...item.children];
          return { ...item, children: newGroup };
        }
        return item;
      });
      setMenuItems(menuAdminGroup);
    } else if (role === ROLES.USER) {
      setMenuItems(menuUser);
    }
  }, [role, isAuth]);

  const handleMenuSelect = ({ key }, isUser) => {
    if (key === "issue") {
      setCollapsed(true);
    }
    setActiveKey(key);
    return navigate(`${key}`);
  };

  const handleOnCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout>
      <Header shouldFixed={1} />
      <LayoutMain hasSider $isAuth={isAuth}>
        {isAuth && (
          <Sidebar
            width={250}
            collapsible
            collapsed={collapsed}
            onCollapse={handleOnCollapse}
            theme="light"
          >
            <MenuNavigation
              mode="inline"
              onSelect={handleMenuSelect}
              selectedKeys={activeKey}
              menuItems={menuItems}
            />
          </Sidebar>
        )}
        <LayoutWrapContent $collapsed={collapsed ? 1 : 0} $isAuth={isAuth}>
          <ContentAnt>
            <BreadcrumbTrail />
            {children}
            <Outlet />
          </ContentAnt>
        </LayoutWrapContent>
      </LayoutMain>
    </Layout>
  );
}
