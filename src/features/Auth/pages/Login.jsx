import { Form } from "antd";
import { isAuthenticated } from "app/selectors/auth";
import { getLogin } from "features/Auth/authSlice";
import FormAuth from "features/Auth/components/FormAuth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login({ active }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthenticated);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  const handleOnFinish = (values) => {
    dispatch(getLogin(values));
    form.resetFields(["username", "password"]);
  };

  const handleOnFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <FormAuth onFinish={handleOnFinish} onFailed={handleOnFailed} active={active} form={form} />
    </div>
  );
}
