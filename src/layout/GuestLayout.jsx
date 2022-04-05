import { Breadcrumb, Layout } from "antd";
import Footer from "components/Footer";
import { headerConfig } from "config/header";
import { menuConfig } from "config/menu";
import { agencies, categories, documents } from "config/sidebar";
import Header from "layout/components/Header";
import MenuNavigation from "layout/components/MenuNavigation";
import Sidebar from "layout/components/Sidebar";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const LayoutAnt = styled(Layout)`
  margin-left: ${(props) => (props.collapsed ? "80px" : "380px")};
`;

const ContentAnt = styled(Layout.Content)`
  padding: 20px;
  padding-top: 0;
`;

export default function GuestLayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const { pathname } = useLocation();
  const pathnames = pathname.split("/");
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
            dataRender={menuConfig.guestLayout}
            hasSubMenu={1}
          />
        </Sidebar>
        <LayoutAnt collapsed={collapsed ? 1 : 0}>
          <ContentAnt>
            <Breadcrumb style={{ margin: "20px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`${pathnames[pathnames.length - 1]}`}>
                  {pathnames[pathnames.length - 1] === "search"
                    ? "Tìm kiếm"
                    : pathnames[pathnames.length - 1] === "document"
                    ? "Loại văn bản"
                    : pathnames[pathnames.length - 1] === "agency"
                    ? "Cơ quan ban phát"
                    : pathnames[pathnames.length - 1] === "category"
                    ? "Chuyên mục"
                    : "Tra cứu văn bản"}
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            {children}
            <Outlet />
          </ContentAnt>
        </LayoutAnt>
      </Layout>
      <Footer />
    </Layout>
  );
}
