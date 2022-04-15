import { Layout } from "antd";
import { getRole, isAuthenticated } from "app/selectors/authSelector";
import Footer from "components/Footer";
import { menuConfig } from "configs/menu";
import { ROLES } from "configs/roles";
import BreadcrumbTrail from "layouts/MainLayout/components/BreadcrumbTrail";
import Header from "layouts/MainLayout/components/Header";
import MenuNavigation from "layouts/MainLayout/components/MenuNavigation";
import Sidebar from "layouts/MainLayout/components/Sidebar";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LayoutMain = styled(Layout)`
  margin-top: 64px;
`;

const LayoutWrapContent = styled(Layout)`
  margin-left: ${(props) => (props.collapsed ? "80px" : props.isAdmin ? "250px" : "200px")};
  margin-top: 5px;
`;

const ContentAnt = styled(Layout.Content)`
  padding: 0 20px;
`;

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthenticated);
  const role = useSelector(getRole);
  const { pathname } = useLocation();
  const path = pathname.split("/").filter((item) => item);

  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState();
  const [menuItems, setMenuItems] = React.useState(menuConfig.GUEST);

  React.useEffect(() => {
    if (path.length === 0) {
      if (isAuth && role === ROLES.ADMIN) {
        navigate("dashboard");
      } else {
        navigate("lookup");
      }
    }
  }, [isAuth, navigate, role, path]);

  React.useEffect(() => {
    if (path.length > 2) {
      setActiveKey(path[0]);
    } else {
      setActiveKey(path[path.length - 1]);
    }
  }, [path]);

  React.useEffect(() => {
    const menuGuest = menuConfig.GUEST;
    const menuUser = menuConfig.USER;
    if (isAuth && role === ROLES.ADMIN) {
      setMenuItems([...menuUser, ...menuConfig[role]]);
    } else if (role === ROLES.USER) {
      setMenuItems([...menuGuest, ...menuUser]);
    } else {
      setMenuItems(menuGuest);
    }
  }, [role, isAuth]);

  const handleMenuSelect = ({ key }, isUser) => {
    const shouldAddPrefixPath = ["dashboard", "lookup", "inbox", "sent", "forward"];
    setActiveKey(key);
    if (isAuth && role === ROLES.ADMIN) {
      if (!shouldAddPrefixPath.includes(key)) {
        return navigate(`m/${key}`);
      }
    }
    return navigate(`${key}`);
  };

  const handleOnCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleOnSubmit = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <Header shouldFixedHeader={1} />
      <LayoutMain hasSider>
        <Sidebar
          width={isAuth && role === ROLES.ADMIN ? 250 : 200}
          collapsible
          collapsed={collapsed}
          onCollapse={handleOnCollapse}
          theme="light"
        >
          <MenuNavigation
            mode="inline"
            onMenuSelect={handleMenuSelect}
            selectedKeys={activeKey}
            // dataMenuSub={menuConfig.GUEST}
            dataMenuItem={menuItems}
            hasSubMenu={1}
          />
        </Sidebar>
        <LayoutWrapContent collapsed={collapsed ? 1 : 0} isAdmin={isAuth && role === ROLES.ADMIN}>
          <ContentAnt>
            <BreadcrumbTrail />
            {children}
            <Outlet />
          </ContentAnt>
        </LayoutWrapContent>
      </LayoutMain>
      <Footer />
    </Layout>
  );
}
