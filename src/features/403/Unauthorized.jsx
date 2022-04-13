import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle={
        <Typography.Text type="secondary">
          Xin lỗi, bạn không có quyền truy cập vào trang này
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
