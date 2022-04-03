import { Tabs } from "antd";
import GuestLayout from "layout/GuestLayout/GuestLayout";
import ForgotPassword from "pages/Auth/ForgotPassword/ForgotPassword";
import Login from "pages/Auth/Login/Login";
import Register from "pages/Auth/Register/Register";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function TabsAuth() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathnameSplit = pathname.split("/");
  const [key, setKey] = React.useState(pathnameSplit[pathnameSplit.length - 1]);

  function handleOnChangeTab(key) {
    setKey(key);
    navigate(`/${pathnameSplit[1]}/${key}`);
  }
  return (
    <>
      <Tabs onChange={handleOnChangeTab} activeKey={key}>
        <Tabs.TabPane tab="Đăng nhập" key="login">
          <Login active={key} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Register" key="register">
          <Register active={key} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Quên mật khẩu" key="forgot">
          <ForgotPassword active={key} />
        </Tabs.TabPane>
      </Tabs>
      <Outlet />
    </>
  );
}
