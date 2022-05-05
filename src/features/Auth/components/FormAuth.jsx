import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background: #d9edff;
`;

const FormAuthInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  width: 95%;
  background-color: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  margin: 0 auto;
  border-radius: 12px;
`;
const WrapperHero = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 600px;
  min-height: 100%;
  background-color: #fffdf2;
  img {
    display: block;
    width: 100%;
  }
`;
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
const RowAnt = styled(Row)`
  width: 100%;
`;
const passwordRules = [
  {
    required: true,
    message: "Vui lòng nhập vào mật khẩu!",
  },
  // {
  //   min: 6,
  //   message: "Mật khẩu phải có ít nhất 6 ký tự!",
  // },
  {
    max: 30,
    message: "Mật khẩu phải có tối đa 30 ký tự!",
  },
];

const emailRules = [
  {
    required: true,
    message: "Vui lòng nhập vào email!",
  },
  {
    type: "email",
    message: "Email không đúng định dạng!",
  },
];

const usernameRules = [
  {
    required: true,
    message: "Vui lòng nhập vào tên đăng nhập!",
  },
  {
    min: 6,
    message: "Tên đăng nhập phải có ít nhất 6 ký tự!",
  },
  {
    max: 30,
    message: "Tên đăng nhập phải có tối đa 30 ký tự!",
  },
  {
    pattern: /^[a-zA-Z0-9_]+$/,
    message: "Tên đăng nhập không được chứa ký tự đặc biệt!",
  },
];
export default function FormAuth({ active, onFinish, onFailed, form }) {
  const onSubmit = (values) => {
    onFinish(values);
  };

  const onSubmitFailed = (errorInfo) => {
    onFailed(errorInfo);
  };
  return (
    <Wrapper forgot={active === "forgot" ? 1 : 0}>
      <FormAuthInner forgot={active === "forgot" ? 1 : 0}>
        <RowAnt>
          <Col span={12}>
            <WrapperHero>
              <img
                src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
                alt="Login"
              />
            </WrapperHero>
          </Col>
          {active === "login" ? (
            <>
              <Col span={12}>
                <FormAnt
                  name="login-form"
                  form={form}
                  onFinish={onSubmit}
                  onFinishFailed={onSubmitFailed}
                >
                  <Title>Chào mừng quay trở lại </Title>
                  <TitleDesc>Đăng nhập vào hệ thống</TitleDesc>
                  <Form.Item name="email" rules={emailRules}>
                    <Input placeholder="Email" size="large" spellCheck="false" />
                  </Form.Item>
                  <Form.Item name="password" rules={passwordRules}>
                    <Input.Password placeholder="Mật khẩu" size="large" />
                  </Form.Item>
                  <Form.Item>
                    <ButtonAnt type="primary" htmlType="submit">
                      Đăng nhập
                    </ButtonAnt>
                  </Form.Item>
                </FormAnt>
              </Col>
            </>
          ) : active === "register" ? (
            <>
              <Col span={12}>
                <FormAnt
                  form={form}
                  name="register-form"
                  initialValues={{ remember: true }}
                  onFinish={onSubmit}
                  onFinishFailed={onSubmitFailed}
                >
                  <Title>Chào mừng đến với hệ thống</Title>
                  <TitleDesc>Đăng ký vào hệ thống</TitleDesc>
                  <Form.Item name="username" rules={usernameRules}>
                    <Input placeholder="Username" size="large" spellCheck="false" />
                  </Form.Item>
                  <Form.Item name="email" rules={emailRules}>
                    <Input placeholder="Email" size="large" />
                  </Form.Item>
                  <Form.Item name="password" rules={passwordRules}>
                    <Input.Password placeholder="Password" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    rules={[{ required: true, message: "Vui lòng xác nhận lại mật khẩu đã nhập!" }]}
                  >
                    <Input.Password placeholder="Confirm password" size="large" />
                  </Form.Item>
                  <Form.Item>
                    <ButtonAnt type="primary" htmlType="submit">
                      Đăng ký
                    </ButtonAnt>
                  </Form.Item>
                </FormAnt>
              </Col>
            </>
          ) : (
            <>
              <Col span={12}>
                <FormAnt
                  forgot={active === "forgot" ? 1 : 0}
                  name="forgot-form"
                  initialValues={{ remember: true }}
                  onFinish={onSubmit}
                  onFinishFailed={onSubmitFailed}
                >
                  <Title>Quên mật khẩu</Title>
                  <TitleDesc>Kiểm tra hộp thư email</TitleDesc>
                  <Form.Item name="email" rules={emailRules}>
                    <Input placeholder="Email" size="large" spellCheck="false" />
                  </Form.Item>
                  <Form.Item>
                    <ButtonAnt type="primary" htmlType="submit">
                      Lấy lại mật khẩu
                    </ButtonAnt>
                  </Form.Item>
                </FormAnt>
              </Col>
            </>
          )}
        </RowAnt>
      </FormAuthInner>
    </Wrapper>
  );
}
