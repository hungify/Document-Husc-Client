import { Layout } from "antd";
import Footer from "components/Footer";
import { headerConfig } from "config/header";
import { menuConfig } from "config/menu";
import Header from "layout/components/Header";
import MenuNavigation from "layout/components/MenuNavigation";
import Sidebar from "layout/components/Sidebar";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LayoutAnt = styled(Layout)`
  margin-top: ${(props) => (props.shouldFixedHeader ? "64px" : "0")};
`;
const ContentAnt = styled(Layout.Content)`
  padding: 20px;
  margin-left: ${(props) => (props.collapsed ? "80px" : "250px")};
`;

export default function UserLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { shouldFixedHeader } = headerConfig.userLayout;
  const pathnameSplit = pathname.split("/");
  
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState(pathnameSplit[pathnameSplit.length - 1]);

  const handleMenuChange = ({ key }) => {
    console.log("🚀 :: key", key);
    setActiveKey(key);
    navigate(key);
  };

  const handleOnCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout>
      <Header shouldFixedHeader={shouldFixedHeader} />
      <Layout hasSider>
        <Sidebar
          onMenuChange={handleMenuChange}
          onCollapse={handleOnCollapse}
          collapsed={collapsed}
          shouldFixedHeader={shouldFixedHeader}
          width={250}
          theme="light"
        >
          <MenuNavigation
            theme="light"
            mode="inline"
            onMenuSelect={handleMenuChange}
            activeKey={activeKey}
            dataRender={menuConfig.userLayout}
          />
        </Sidebar>
        <LayoutAnt shouldFixedHeader={shouldFixedHeader}>
          <ContentAnt collapsed={collapsed ? 1 : 0}>
            {children}
            <Outlet />
          </ContentAnt>
        </LayoutAnt>
      </Layout>
      <Footer />
    </Layout>
  );
}
