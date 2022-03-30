import { AppstoreOutlined, FileTextOutlined, TeamOutlined } from "@ant-design/icons";
import { Badge, Breadcrumb, Layout, Menu } from "antd";
import LogoHusc from "assets/images/logo/logo.svg";
import { agencies, categories, documents } from "mocks";
import Home from "pages/Home/Home";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

const HeaderAnt = styled(Header)`
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 5;
`;
const Logo = styled.div`
  float: left;
  width: 120px;
  height: 50px;
  margin: 0px 24px 20px 0;
  background: rgba(255, 255, 255, 0.3);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const SiderStyled = styled(Sider)`
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
export default function MainLayout(props) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [openKeys, setOpenKeys] = React.useState(["document"]);

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
      <HeaderAnt>
        <Logo>
          <img src={LogoHusc} alt="" />
        </Logo>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Sinh viên</Menu.Item>
          <Menu.Item key="2">Giảng viên</Menu.Item>
          <Menu.Item key="3">Cán bộ</Menu.Item>
        </Menu>
      </HeaderAnt>
      <Layout hasSider>
        <SiderStyled
          width={380}
          collapsible
          collapsed={collapsed}
          onCollapse={handleOnCollapse}
          style={{}}
        >
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
        </SiderStyled>
        <Layout style={{ marginLeft: 380 }}>
          <Breadcrumb style={{ margin: "15px 0 5px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="search">Tra cứu văn bản</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ margin: "10px 10px 0", overflow: "initial" }}>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
