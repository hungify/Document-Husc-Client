import { Breadcrumb, Layout } from "antd";
import Footer from "components/Footer";
import { headerConfig } from "config/header";
import { menuConfig } from "config/menu";
import Header from "layout/components/Header";
import MenuNavigation from "layout/components/MenuNavigation";
import Sidebar from "layout/components/Sidebar";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LayoutAnt = styled(Layout)`
  margin-top: ${(props) => (props.shouldFixedHeader ? "64px" : "0")};
`;
const ContentAnt = styled(Layout.Content)`
  padding: 20px;
  padding-top: 0;
  margin-left: ${(props) => (props.collapsed ? "80px" : "250px")};
`;

export default function UserLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathnames = pathname.split("/");

  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState();

  const { shouldFixedHeader } = headerConfig.userLayout;

  React.useEffect(() => {
    if (pathnames.length === 2) {
      setActiveKey(menuConfig.userLayout[0].key);
    } else {
      setActiveKey(pathnames[pathnames.length - 1]);
    }
  }, []);

  const handleMenuChange = ({ key }) => {
    navigate(key);
    setActiveKey(key);
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
