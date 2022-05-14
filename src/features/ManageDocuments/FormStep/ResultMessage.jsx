import { Button, Result } from "antd";
import { getSuccessIssueDocument } from "app/selectors/documents";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ResultMessage({ modeSave }) {
  const navigate = useNavigate();
  const hasSuccess = useSelector(getSuccessIssueDocument);

  return (
    <Result
      status={modeSave === "official" ? (hasSuccess ? "success" : "error") : "success"}
      title={
        modeSave === "official"
          ? hasSuccess
            ? "Phát hành văn bản thành công"
            : "Có lỗi xảy ra khi phát hành văn bản"
          : "Văn bản đã được lưu trữ ở chế độ bản nháp"
      }
      subTitle={
        modeSave === "official"
          ? hasSuccess
            ? "Bạn có thể vào văn bản đã phát hành để xem công tác xử lý của các bên liên quan"
            : "Vui lòng thử lại sau"
          : "Bạn có thể vào văn bản nháp để tiếp tục ban hành văn bản này"
      }
      extra={[
        <Button type="primary" onClick={() => navigate("/")} size="large" key="go_to_dashboard">
          Quay lại bảng điều khiển
        </Button>,
        <Button onClick={() => navigate("..")} size="large" key="save_document">
          {modeSave === "official"
            ? "Quay lại danh sách văn bản"
            : "Quay lại danh sách văn bản nháp"}
        </Button>,
      ]}
    />
  );
}
