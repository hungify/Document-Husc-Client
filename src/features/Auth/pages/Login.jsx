import { Form } from "antd";
import { isAuthenticated } from "app/selectors/auth";
import { fetchLogin } from "features/Auth/authSlice";
import FormAuth from "features/Auth/components/FormAuth";
import { fetchProfile } from "features/Profile/profileSlice";
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
      dispatch(fetchProfile());
      navigate("/dashboard");
    }
  }, [isAuth, navigate, dispatch]);

  const handleOnFinish = (values) => {
    dispatch(fetchLogin(values));
    form.resetFields(["email", "password"]);
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
