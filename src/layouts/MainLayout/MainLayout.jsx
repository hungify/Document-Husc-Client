import { Layout } from "antd";
import { getRole, isAuthenticated } from "app/selectors/authSelector";
import Footer from "components/Footer";
import { headerConfig } from "config/header";
import { menuConfig } from "config/menu";
import { ROLES } from "config/roles";
import DynamicBreadcrumb from "layouts/MainLayout/components/DynamicBreadcrumb";
import Header from "layouts/MainLayout/components/Header";
import MenuNavigation from "layouts/MainLayout/components/MenuNavigation";
import Sidebar from "layouts/MainLayout/components/Sidebar";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LayoutAnt = styled(Layout)`
  margin-left: ${(props) => (props.collapsed ? "80px" : "380px")};
`;

const ContentAnt = styled(Layout.Content)`
  padding: 20px;
  padding-top: 0;
`;

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState();
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthenticated);
  const role = useSelector(getRole);
  const [menuItems, setMenuItems] = React.useState([]);

  React.useEffect(() => {
    if (isAuth) {
      setMenuItems(menuConfig[role]);
    } else {
      setMenuItems([]);
    }
  }, [role, isAuth]);

  const { shouldFixedHeader } = headerConfig.guestLayout;

  const handleMenuSelect = ({ key }, isUser) => {
    setActiveKey(key);
    navigate(`${key}`);
  };

  const handleOnCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout>
      <Header shouldFixedHeader={shouldFixedHeader} />
      <Layout hasSider>
        <Sidebar
          width={380}
          collapsible
          collapsed={collapsed}
          onCollapse={handleOnCollapse}
          theme="light"
        >
          <MenuNavigation
            mode="inline"
            onMenuSelect={handleMenuSelect}
            selectedKeys={activeKey}
            dataMenuSub={menuConfig.GUEST}
            dataMenuItem={menuItems}
            hasSubMenu={1}
          />
        </Sidebar>
        <LayoutAnt collapsed={collapsed ? 1 : 0}>
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
