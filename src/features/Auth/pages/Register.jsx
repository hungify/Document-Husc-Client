import { Button, Form, Input, Typography } from "antd";
import { getDepartmentsConfig } from "app/selectors/departments";
import SelectForm from "components/SelectForm";
import { fetchRegister } from "features/Auth/authSlice";
import FormAuth from "features/Auth/components/FormAuth";
import { authRules } from "features/Auth/validations/rules";
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

export default function Register({ active }) {
  const departments = useSelector(getDepartmentsConfig);
  const [department, setDepartment] = React.useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (values) => {
    values.navigate = navigate;
    dispatch(fetchRegister(values));
    form.resetFields(["password", "confirmPassword"]);
  };

  const handleRegisterFailed = (errorInfo) => {};
  const handleDepartmentSelect = (value) => {
    setDepartment(value);
  };

  return (
    <FormAuth active={active}>
      <FormAnt
        form={form}
        name="register-form"
        onFinish={handleRegister}
        onFinishFailed={handleRegisterFailed}
      >
        <Title>Chào mừng đến với hệ thống</Title>
        <TitleDesc>Đăng ký vào hệ thống</TitleDesc>
        <Form.Item name="username" rules={authRules.username}>
          <Input placeholder="Tên hiển thị" size="large" spellCheck="false" />
        </Form.Item>
        <Form.Item name="department" rules={authRules.department}>
          <SelectForm
            selectData={departments}
            onSelect={handleDepartmentSelect}
            value={department}
            showSearch={true}
            placeholder="Chọn phòng ban làm việc"
            size="large"
            allowClear
            filterOption={false}
          />
        </Form.Item>
        <Form.Item name="email" rules={authRules.email} id="register_email">
          <Input placeholder="Email" size="large" spellCheck={false} />
        </Form.Item>
        <Form.Item name="password" rules={authRules.password} id="register_password">
          <Input.Password placeholder="Password" size="large" spellCheck="false" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
          id="register_confirm_password"
        >
          <Input.Password placeholder="Confirm password" size="large" spellCheck="false" />
        </Form.Item>
        <Form.Item>
          <ButtonAnt type="primary" htmlType="submit">
            Đăng ký
          </ButtonAnt>
        </Form.Item>
      </FormAnt>
    </FormAuth>
  );
}
