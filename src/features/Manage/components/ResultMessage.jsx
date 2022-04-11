import { Button, Result } from "antd";

export default function ResultMessage() {
  return (
    <Result
      status="success"
      title="Phát hành văn bản thành công"
      subTitle="Bạn có thể vào văn bản đã phát hành để xem chi tiết việc xử lý của các bên liên quan"
      extra={[
        <Button type="primary" key="console">
          Quay lại bảng điều khiển
        </Button>,
        <Button>Phát hành văn bản khác</Button>,
      ]}
    />
  );
}
