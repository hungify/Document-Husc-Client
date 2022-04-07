import { Avatar, Button, Card, Col, Row, Space, Tooltip, Typography } from "antd";
import MailContent from "features/Notifications/components/MailContent";
import React from "react";
import { useParams } from "react-router-dom";
export default function ForwardDetail() {
  const { forwardId } = useParams();
  const data = {
    id: forwardId,
    title: `Văn bản đã chuyển tiếp thứ ${forwardId}`,
    myMessage: "This is my message",
    message: "Toàn thể khoa hãy triển khoai kế hoạch như trong văn bản.",
    publisher: {
      name: "Nguyễn Mạnh Tuấn",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.publisher.${forwardId}@husc.edu.vn`,
    },
    to: {
      name: "Hồng Nhung",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.receiver.${forwardId}@husc.edu.vn`,
    },
  };

  return (
    <Card title="Nội dung thông báo" extra={<Button type="primary">Chuyển tiếp</Button>}>
      <Row gutter={[15, 10]} align="middle">
        <Col>
          <Avatar src={data.to.avatar} />
        </Col>
        <Col>
          <Space>
            <Tooltip placement="top" title={data.to.email}>
              <Typography.Text strong>{data.to.name}</Typography.Text>
            </Tooltip>
            <Tooltip placement="top" title="20/04/2022 21:19:38">
              <Typography.Text type="secondary">2 day ago</Typography.Text>
            </Tooltip>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Typography.Paragraph>
            <pre>{data.myMessage}</pre>
          </Typography.Paragraph>
          <Card title="Forwarded message">
            <Typography.Paragraph>
              Từ:&nbsp;
              <Typography.Text strong>
                {data.publisher.name} - {data.publisher.email}
              </Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Đến:&nbsp;
              <Typography.Text strong>
                {data.to.name} - {data.to.email}
              </Typography.Text>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      <Col flex="auto">
        <MailContent />
      </Col>
    </Card>
  );
}
