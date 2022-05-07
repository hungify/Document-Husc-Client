import { Button, Form, Input, Typography } from "antd";
import FormAuth from "features/Auth/components/FormAuth";
import { authRules } from "features/Auth/validations/rules";
import React from "react";
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

export default function ForgotPassword({ active }) {
  const handleForgotPassword = (values) => {
    // onFinish(values);
  };

  const handleForgotPasswordFailed = (errorInfo) => {};
  return (
    <FormAuth active={active}>
      <FormAnt
        forgot={active === "forgot" ? 1 : 0}
        name="forgot-form"
        initialValues={{ remember: true }}
        onFinish={handleForgotPassword}
        onFinishFailed={handleForgotPasswordFailed}
      >
        <Title>Quên mật khẩu</Title>
        <TitleDesc>Kiểm tra hộp thư email</TitleDesc>
        <Form.Item name="email" rules={authRules.email}>
          <Input placeholder="Email" size="large" spellCheck="false" />
        </Form.Item>
        <Form.Item>
          <ButtonAnt type="primary" htmlType="submit">
            Lấy lại mật khẩu
          </ButtonAnt>
        </Form.Item>
      </FormAnt>
    </FormAuth>
  );
}
