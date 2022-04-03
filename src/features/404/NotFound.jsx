import { Button, Result, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={
        <Typography.Text type="secondary">
          Hmm, Có vẻ như bạn đang truy cập vào một trang không tồn tại.
        </Typography.Text>
      }
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
}
