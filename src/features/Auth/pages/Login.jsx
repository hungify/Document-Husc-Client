import { Button, Form, Input, Typography } from "antd";
import { isAuthenticated } from "app/selectors/auth";
import { fetchLogin } from "features/Auth/authSlice";
import FormAuth from "features/Auth/components/FormAuth";
import { authRules } from "features/Auth/validations/rules";
import { fetchProfile } from "features/Profile/profileSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormAnt = styled(Form)`
  flex: 1 0 100%;
  /* max-width: 480px; */
  width: 100%;
  padding: 50px;
  max-height: 800px;
  height: 100%;
`;
const Title = styled(Typography.Title)`
  color: #333333;
  font-family: "Josefin Sans", sans-serif;
  font-size: 42px;
  font-weight: bold;
  line-height: 1;
`;
const TitleDesc = styled(Typography.Paragraph)`
  margin-bottom: 30px;
`;
const ButtonAnt = styled(Button)`
  height: 42px;
  letter-spacing: 1px;
  border-radius: 6px;
  width: 100%;
`;

export default function Login({ active }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthenticated);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchProfile());
      navigate("/dashboard");
    }
  }, [isAuth, navigate, dispatch]);

  const handleLogin = (values) => {
    dispatch(fetchLogin(values));
    form.resetFields(["email", "password"]);
  };

  const handleLoginFailed = (errorInfo) => {};

  return (
    <FormAuth active={active}>
      <FormAnt
        name="login_form"
        form={form}
        onFinish={handleLogin}
        onFinishFailed={handleLoginFailed}
      >
        <>
          <Title>Chào mừng quay trở lại </Title>
          <TitleDesc>Đăng nhập vào hệ thống</TitleDesc>
          <Form.Item
            name="email"
            rules={authRules.email}
            id="login_email"
            initialValue={"admin2022@husc.edu.vn"}
          >
            <Input placeholder="Email" size="large" spellCheck="false" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={authRules.password}
            id="login_password"
            initialValue={"admin2022"}
          >
            <Input.Password placeholder="Mật khẩu" size="large" spellCheck="false" />
          </Form.Item>
        </>
        <Form.Item>
          <ButtonAnt type="primary" htmlType="submit">
            Đăng nhập
          </ButtonAnt>
        </Form.Item>
      </FormAnt>
    </FormAuth>
  );
}
