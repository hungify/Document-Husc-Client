import { Tabs } from "antd";
import GuestLayout from "layout/GuestLayout/GuestLayout";
import ForgotPassword from "pages/Auth/ForgotPassword/ForgotPassword";
import Login from "pages/Auth/Login/Login";
import Register from "pages/Auth/Register/Register";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TabsAuth() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathnameSplit = pathname.split("/");
  const [key, setKey] = React.useState(pathnameSplit[pathnameSplit.length - 1]);

  React.useEffect(() => {
    if (pathname === "/a") {
      setKey("login");
      navigate(`/a/login`);
    }
  }, [pathname]);

  function handleOnChangeTab(key) {
    setKey(key);
    navigate(key);
  }
  return (
    <GuestLayout>
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
    </GuestLayout>
  );
}
