import { Layout } from "antd";
import { getRole, isAuthenticated } from "app/selectors/authSelector";
import Footer from "components/Footer";
import { headerConfig } from "configs/header";
import { menuConfig } from "configs/menu";
import { ROLES } from "configs/roles";
import DynamicBreadcrumb from "layouts/MainLayout/components/DynamicBreadcrumb";
import Header from "layouts/MainLayout/components/Header";
import MenuNavigation from "layouts/MainLayout/components/MenuNavigation";
import Sidebar from "layouts/MainLayout/components/Sidebar";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LayoutAnt = styled(Layout)`
  margin-left: ${(props) => (props.collapsed ? "80px" : props.isAdmin ? "250px" : "200px")};
`;

const ContentAnt = styled(Layout.Content)`
  padding: 20px;
  padding-top: 0;
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
    if (isAuth) {
      const menu = menuConfig.GUEST;
      setMenuItems([...menu, ...menuConfig[role]]);
    } else {
      setMenuItems(menuConfig.GUEST);
    }
  }, [role, isAuth]);

  const { shouldFixedHeader } = headerConfig.guestLayout;

  const handleMenuSelect = ({ key }, isUser) => {
    const shouldAddPrefixPath = ["dashboard", "lookup", "inbox", "sent", "draft", "forward"];
    setActiveKey(key);
    if (isAuth && role === ROLES.ADMIN) {
      if (!shouldAddPrefixPath.includes(key)) {
        return navigate(`m/${key}`);
      }
    }
    return navigate(`${key}`);
  };

  const handleOnCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout>
      <Header shouldFixedHeader={shouldFixedHeader} />
      <Layout hasSider>
        <Sidebar
          width={isAuth && role === ROLES.ADMIN ? 250 : 200}
          collapsible
          collapsed={collapsed}
          onCollapse={handleOnCollapse}
          theme="light"
        >
          <MenuNavigation
            mode="inline"
            onMenuSelect={handleMenuSelect}
            selectedKeys={activeKey}
            // dataMenuSub={menuConfig.GUEST}
            dataMenuItem={menuItems}
            hasSubMenu={1}
          />
        </Sidebar>
        <LayoutAnt collapsed={collapsed ? 1 : 0} isAdmin={isAuth && role === ROLES.ADMIN}>
          <ContentAnt>
            <DynamicBreadcrumb />
            {children}
            <Outlet />
          </ContentAnt>
        </LayoutAnt>
      </Layout>
      <Footer />
    </Layout>
  );
}
