import { Tabs } from "antd";
import MainLayout from "layout/MainLayout";
import ForgotPassword from "pages/ForgotPassword/ForgotPassword";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TabsAuth() {
  const { pathname } = useLocation();
  const [pathnameSplit] = React.useState(pathname.split("/"));
  const [key, setKey] = React.useState(pathnameSplit[pathnameSplit.length - 1]);

  const navigate = useNavigate();
  function handleOnChangeTab(key) {
    setKey(key);
    navigate(key);
  }
  return (
    <MainLayout>
      <Tabs onChange={handleOnChangeTab} activeKey={key}>
        <Tabs.TabPane tab="Đăng nhập" key="login">
          <Login active={key} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Quên mật khẩu" key="forgot">
          <ForgotPassword active={key} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Register" key="register">
          <Register active={key} />
        </Tabs.TabPane>
      </Tabs>
    </MainLayout>
  );
}
