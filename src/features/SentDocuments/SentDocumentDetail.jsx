import { Button, Card, Col, Space } from "antd";
import DetailDocument from "components/DetailDocument";

export default function SentDocumentDetail() {
  return (
    <Card
      title="Nội dung văn bản"
      extra={
        <Space>
          <Button type="primary">Chuyển tiếp</Button>
        </Space>
      }
    >
      <Col flex="auto">
        <DetailDocument />
      </Col>
    </Card>
  );
}
