import { Breadcrumb, Layout } from "antd";
import Footer from "components/Footer";
import { headerConfig } from "config/header";
import { agencies, categories, documents } from "config/sidebar";
import Header from "layout/components/Header";
import MenuNavigation from "layout/components/MenuNavigation";
import Sidebar from "layout/components/Sidebar";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const LayoutAnt = styled(Layout)`
  padding: 20px;
  margin-left: ${(props) => (props.collapsed ? "80px" : "380px")};
`;

export default function GuestLayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const { pathname } = useLocation();

  const [pathnameSplit] = React.useState(pathname.split("/"));
  const { shouldFixedHeader } = headerConfig.guestLayout;

  const handleMenuSelect = (item) => {
    console.log(item);
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
            dataRender={[{ documents }, { agencies }, { categories }]}
            hasSubMenu={1}
          />
        </Sidebar>
        <Layout collapsed={collapsed ? 1 : 0}>
          {!pathnameSplit[1].includes("a") && (
            <Breadcrumb style={{ margin: "15px 0 5px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`${pathnameSplit[pathnameSplit.length - 1]}`}>
                  {pathnameSplit[pathnameSplit.length - 1] === "search"
                    ? "Tìm kiếm"
                    : pathnameSplit[pathnameSplit.length - 1] === "document"
                    ? "Loại văn bản"
                    : pathnameSplit[pathnameSplit.length - 1] === "agency"
                    ? "Cơ quan ban phát"
                    : pathnameSplit[pathnameSplit.length - 1] === "category"
                    ? "Chuyên mục"
                    : "Tra cứu văn bản"}
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          )}
          <LayoutAnt>
            <Layout.Content>
              {children}
              <Outlet />
            </Layout.Content>
          </LayoutAnt>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
}
