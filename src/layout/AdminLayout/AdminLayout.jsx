import { Layout } from "antd";
import { headerConfig } from "config/header";
import { sidebarConfig } from "config/sidebar";
import Header from "layout/components/Header";
import MenuNavigation from "layout/components/MenuNavigation";
import Sidebar from "layout/components/Sidebar";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContentAnt = styled(Layout.Content)`
  margin-left: 280px;
  padding: 20px 24px;
`;

export default function AdminLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pathnameSplit = pathname.split("/");
  const { shouldFixedHeader } = headerConfig;

  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState(pathnameSplit[pathnameSplit.length - 1]);

  const handleMenuChange = (key) => {
    setActiveKey(key);

    navigate("/m/" + key);
  };

  const handleOnCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout>
      <Header shouldFixedHeader={shouldFixedHeader} />
      <Layout>
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
            dataRender={sidebarConfig.adminLayout}
          />
        </Sidebar>
        <ContentAnt>{children}</ContentAnt>
      </Layout>
    </Layout>
  );
}
