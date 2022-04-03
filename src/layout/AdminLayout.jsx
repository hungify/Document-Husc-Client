import { Breadcrumb, Layout } from "antd";
import { headerConfig } from "config/header";
import { menuConfig } from "config/menu";
import Header from "layout/components/Header";
import MenuNavigation from "layout/components/MenuNavigation";
import Sidebar from "layout/components/Sidebar";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContentAnt = styled(Layout.Content)`
  padding: 20px;
  padding-top: 0;
  margin-left: ${(props) => (props.collapsed ? "80px" : "250px")};
`;

export default function AdminLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pathnames = pathname?.split("/");
  const { shouldFixedHeader } = headerConfig;
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState();

  React.useEffect(() => {
    setActiveKey(pathnames[pathnames.length - 1]);
  }, [pathnames]);

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
            selectedKeys={activeKey}
            dataRender={menuConfig.adminLayout}
          />
        </Sidebar>
        <ContentAnt collapsed={collapsed ? 1 : 0}>
          <Breadcrumb style={{ margin: "20px 0" }}>
            <Breadcrumb.Item>
              <Link to=".">Dashboard</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`${pathnames[pathnames.length - 1]}`}>
                {pathnames[pathnames.length - 1] === "document"
                  ? "Quản lý văn bản"
                  : pathnames[pathnames.length - 1] === "category"
                  ? "Quản lý chuyên mục"
                  : pathnames[pathnames.length - 1] === "agency"
                  ? "Quản lý cơ quan ban hành"
                  : pathnames[pathnames.length - 1] === "dashboard"
                  ? "Analytics"
                  : ""}
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          {children}
          <Outlet />
        </ContentAnt>
      </Layout>
    </Layout>
  );
}
