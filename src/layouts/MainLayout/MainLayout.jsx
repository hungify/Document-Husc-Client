import { Layout } from "antd";
import Footer from "components/Footer";
import { headerConfig } from "config/header";
import { menuConfig } from "config/menu";
import DynamicBreadcrumb from "layouts/components/DynamicBreadcrumb";
import Header from "layouts/components/Header";
import MenuNavigation from "layouts/components/MenuNavigation";
import Sidebar from "layouts/components/Sidebar";
import React from "react";
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
  const [menuSetting, setMenuSetting] = React.useState();
  const { pathname } = useLocation();
  const [activeKey, setActiveKey] = React.useState();
  const pathnames = pathname.split("/").filter((item) => item);
  const navigate = useNavigate();
  React.useEffect(() => {
    const path = pathnames[0];
    if (path === "n") {
      setMenuSetting(menuConfig.userLayout);
    } else {
      setMenuSetting(menuConfig.adminLayout);
    }
  }, [pathnames]);

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
            dataMenuSub={menuConfig.guestLayout}
            dataMenuItem={menuSetting}
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
