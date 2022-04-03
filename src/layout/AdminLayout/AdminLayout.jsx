import { Layout } from "antd";
import { headerConfig } from "config/header";
import { menuConfig } from "config/menu";
import Header from "layout/components/Header";
import MenuNavigation from "layout/components/MenuNavigation";
import Sidebar from "layout/components/Sidebar";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContentAnt = styled(Layout.Content)`
  padding: 20px;
  margin-left: ${(props) => (props.collapsed ? "80px" : "250px")};
`;

export default function AdminLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pathnameSplit = pathname.split("/");
  const { shouldFixedHeader } = headerConfig;
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState(pathnameSplit[pathnameSplit.length - 1]);

  const handleMenuChange = ({ key }) => {
    setActiveKey(key);
    navigate(key);
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
            dataRender={menuConfig.adminLayout}
          />
        </Sidebar>
        <ContentAnt collapsed={collapsed ? 1 : 0}>
          {children}
          <Outlet />
        </ContentAnt>
      </Layout>
    </Layout>
  );
}
