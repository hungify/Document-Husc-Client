import { Layout } from "antd";
import Footer from "components/Footer";
import { headerConfig } from "config/header";
import { sidebarConfig } from "config/sidebar";
import Header from "layout/components/Header";
import MenuNavigation from "layout/components/MenuNavigation";
import Sidebar from "layout/components/Sidebar";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LayoutAnt = styled(Layout)`
  margin-top: ${(props) => (props.shouldFixedHeader ? "64px" : "0")};
`;
const ContentAnt = styled(Layout.Content)`
  margin-left: ${(props) => (props.shouldFixedHeader ? "270px" : "0")};
`;

export default function UserLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { shouldFixedHeader } = headerConfig.userLayout;
  const pathnameSplit = pathname.split("/");

  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState(pathnameSplit[pathnameSplit.length - 1]);

  const handleMenuChange = (key) => {
    setActiveKey(key);
    navigate("/notifications/" + key);
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
            dataRender={sidebarConfig.userLayout}
          />
        </Sidebar>
        <LayoutAnt shouldFixedHeader={shouldFixedHeader}>
          <ContentAnt shouldFixedHeader={shouldFixedHeader}>{children}</ContentAnt>
        </LayoutAnt>
      </Layout>
      <Footer />
    </Layout>
  );
}
