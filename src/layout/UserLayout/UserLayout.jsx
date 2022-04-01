import { AppstoreOutlined, FileTextOutlined, TeamOutlined } from "@ant-design/icons";
import { Badge, Breadcrumb, Layout, Menu } from "antd";
import Footer from "components/Footer";
import Header from "components/Header";
import { agencies, categories, documents } from "mocks";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const SiderAnt = styled(Sider)`
  height: 100vh;
  background: #fff;
  overflow-y: scroll;
  overflow-x: auto;
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 0;
`;
const WrapperItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const BadgeAnt = styled(Badge)`
  position: absolute;
  transform: translate(10%, 50%);
`;

const rootSubmenuKeys = ["document", "agency", "category"];
export default function UserLayout(props) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [openKeys, setOpenKeys] = React.useState(["document"]);
  const { pathname } = useLocation();
  const [pathnameSplit] = React.useState(pathname.split("/"));

  const handleMenuChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleOnCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <Layout hasSider>
        <SiderAnt width={380} collapsible collapsed={collapsed} onCollapse={handleOnCollapse}>
          <Menu mode="inline" openKeys={openKeys} onOpenChange={handleMenuChange}>
            <SubMenu key="document" icon={<FileTextOutlined />} title="Loại văn bản">
              {documents.data.map((document) => (
                <Menu.Item key={document.id}>{document.value}</Menu.Item>
              ))}
            </SubMenu>
            <SubMenu key="agency" icon={<TeamOutlined />} title="Cơ quan ban phát">
              {agencies.data.map((agency) => (
                <WrapperItem key={agency.id}>
                  <BadgeAnt size="default" count={agency.children.length} />
                  <Menu.Item>{agency.value}</Menu.Item>
                </WrapperItem>
              ))}
            </SubMenu>
            <SubMenu key="category" icon={<AppstoreOutlined />} title="Chuyên mục">
              {categories.data.map((category) => (
                <div key={category.id}>
                  <BadgeAnt size="default" count={category.children.length} />
                  {category.children.length > 0 ? (
                    <SubMenu title={category.value}>
                      {category.children.map((child) =>
                        child.children.length > 0 ? (
                          <div key={child.id}>
                            <BadgeAnt size="default" count={child.children.length} />
                            <SubMenu title={child.value}>
                              {child?.children.map((c) => (
                                <Menu.Item key={c.id}>{c.value}</Menu.Item>
                              ))}
                            </SubMenu>
                          </div>
                        ) : (
                          <Menu.Item key={child.id}>{child.value}</Menu.Item>
                        )
                      )}
                    </SubMenu>
                  ) : (
                    <Menu.Item key={category.id}>{category.value}</Menu.Item>
                  )}
                </div>
              ))}
            </SubMenu>
          </Menu>
        </SiderAnt>
        <Layout style={{ marginLeft: collapsed ? 80 : 380 }}>
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
          <Content style={{ margin: "10px 10px 0", overflow: "initial" }}>{props.children}</Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
}
