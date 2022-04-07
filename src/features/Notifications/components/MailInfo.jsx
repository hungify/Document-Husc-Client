import { Avatar, Col, Row, Space, Tooltip, Typography } from "antd";
import React from "react";
export default function MailInfo() {
  return (
    <Row gutter={[15, 10]} align="middle">
      <Col>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
      </Col>
      <Col flex="auto">
        <Space>
          <Tooltip placement="top" title="email.receiver.1@husc.edu.vn">
            <Typography.Text strong>Han Solo</Typography.Text>
          </Tooltip>
          <Tooltip placement="top" title="20/04/2022 21:19:38">
            <Typography.Text type="secondary">2 day ago</Typography.Text>
          </Tooltip>
        </Space>
      </Col>
    </Row>
  );
}
