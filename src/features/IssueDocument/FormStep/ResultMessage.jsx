import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function ResultMessage({ modeSave }) {
  const navigate = useNavigate();
  return (
    <Result
      status="success"
      title={
        modeSave === "official"
          ? "Phát hành văn bản thành công"
          : "Văn bản đã được lưu trữ ở chế độ bản nháp"
      }
      subTitle={
        modeSave === "official"
          ? "Bạn có thể vào văn bản đã phát hành để xem công tác xử lý của các bên liên quan"
        : "Bạn có thể vào văn bản nháp để tiếp tục ban hành văn bản này"
      }
      extra={[
        <Button type="primary" onClick={() => navigate("/")} size="large">
          Quay lại bảng điều khiển
        </Button>,
        <Button onClick={() => navigate("..")} size="large">
          Phát hành văn bản khác
        </Button>,
      ]}
    />
  );
}
