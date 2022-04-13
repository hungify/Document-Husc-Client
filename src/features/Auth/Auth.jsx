import { Tabs } from "antd";
import ForgotPassword from "features/Auth/pages/ForgotPassword";
import Login from "features/Auth/pages/Login";
import Register from "features/Auth/pages/Register";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Auth() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const paths = pathname.split("/").filter((item) => item);
  const [key, setKey] = React.useState(paths[paths.length - 1]);

  function handleOnChangeTab(key) {
    setKey(key);
    navigate(`${key}`);
  }
  return (
    <>
      <Tabs onChange={handleOnChangeTab} activeKey={key}>
        <Tabs.TabPane tab="Đăng nhập" key="login">
          <Login active={key} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đăng ký" key="register">
          <Register active={key} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Quên mật khẩu" key="forgot">
          <ForgotPassword active={key} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
