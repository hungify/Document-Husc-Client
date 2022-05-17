import { Layout } from "antd";
import { getRole, isAuthenticated } from "app/selectors/auth";
import LoadingOverlayApp from "components/LoadingOverlayApp";
import { menuConfig } from "configs/menu";
import { ROLES } from "configs/roles";
import BreadcrumbTrail from "layouts/MainLayout/components/BreadcrumbTrail";
import Header from "layouts/MainLayout/components/Header";
import MenuNavigation from "layouts/MainLayout/components/MenuNavigation";
import Sidebar from "layouts/MainLayout/components/Sidebar";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import styled from "styled-components";
import { fetchAgencies } from "features/ManageAgencies/agenciesSlice";
import { fetchUrgentLevels } from "app/reducers/configs/urgentLevelsSlice";
import { fetchCategories } from "features/ManageCategories/categoriesSlice";
import { fetchTypesOfDocuments } from "features/ManageTypesOfDocuments/typesOfDocumentSlice";
import { getLoadingTypesOfDocuments } from "app/selectors/typesOfDocuments";
import { fetchDepartments } from "features/ManageDepartments/departmentsSlice";

const LayoutMain = styled(Layout)`
  margin-top: 64px;
  padding: ${(props) => (props.$isAuth ? "0" : "0 60px")};
  height: calc(100vh - 128px);
`;

const LayoutWrapContent = styled(Layout)`
  margin-left: ${(props) => (props.$collapsed ? "80px" : props.$isAuth ? "250px" : "0")};
`;

const ContentAnt = styled(Layout.Content)`
  padding: 0 15px;
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
  const [loading, setLoading] = React.useState(true);
  const loadingApp = useSelector(getLoadingTypesOfDocuments);

  React.useEffect(() => {
    if (loadingApp) {
      setLoading(false);
    }
  }, [loadingApp]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAgencies());
    dispatch(fetchUrgentLevels());
    dispatch(fetchCategories());
    dispatch(fetchDepartments());
    dispatch(fetchTypesOfDocuments()); // this line must be end of dispatch
  }, [dispatch]);

  React.useEffect(() => {
    if (path.length > 2) {
      setActiveKey(path[0]);
    } else {
      setActiveKey(path[path.length - 1]);
    }
  }, [path]);

  React.useEffect(() => {
    const menuUser = menuConfig.USER;
    if (isAuth && role === ROLES.ADMIN) {
      const menuAdmin = menuConfig.ADMIN;
      const menuAdminGroup = menuAdmin.map((item) => {
        if (item.key === "lookup-operates") {
          const newGroup = [...menuUser, ...item.children];
          return { ...item, children: newGroup };
        }
        return item;
      });
      setMenuItems(menuAdminGroup);
    } else if (role === ROLES.USER) {
      setMenuItems(menuUser);
    }
  }, [role, isAuth]);

  const handleMenuSelect = ({ key }, isUser) => {
    if (key === "issue") {
      setCollapsed(true);
    }
    setActiveKey(key);
    return navigate(`${key}`);
  };

  const handleOnCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <LoadingOverlayApp spinner={<PulseLoader size={15} color="#F5A623" />} active={loading}>
      <Layout>
        <Header shouldFixed={1} />
        <LayoutMain hasSider $isAuth={isAuth}>
          {isAuth && (
            <Sidebar
              trigger={path[0] === "issue" ? null : ""}
              width={250}
              collapsible
              collapsed={collapsed}
              onCollapse={handleOnCollapse}
              theme="light"
            >
              <MenuNavigation
                mode="inline"
                onSelect={handleMenuSelect}
                selectedKeys={activeKey}
                menuItems={menuItems}
              />
            </Sidebar>
          )}
          <LayoutWrapContent $collapsed={collapsed ? 1 : 0} $isAuth={isAuth}>
            <ContentAnt>
              <BreadcrumbTrail />
              {children}
              <Outlet />
            </ContentAnt>
          </LayoutWrapContent>
        </LayoutMain>
      </Layout>
    </LoadingOverlayApp>
  );
}
