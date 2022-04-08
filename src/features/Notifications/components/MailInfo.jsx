import { Avatar, Card, Col, Row, Space, Tooltip, Typography } from "antd";
import React from "react";
export default function MailInfo({ dataRender, isInbox }) {
  return isInbox ? (
    <Row gutter={[15, 10]} align="middle">
      <Col>
        <Avatar src={dataRender.from.avatar} />
      </Col>
      <Col flex="auto">
        <Space>
          <Tooltip placement="top" title={dataRender.from.email}>
            <Typography.Text strong>{dataRender.from.name}</Typography.Text>
          </Tooltip>
          <Tooltip placement="top" title="20/04/2022 21:19:38">
            <Typography.Text type="secondary">2 day ago</Typography.Text>
          </Tooltip>
        </Space>
      </Col>
    </Row>
  ) : (
    <>
      <Row gutter={[15, 10]} align="middle">
        <Col>
          <Avatar src={dataRender.to.avatar} />
        </Col>
        <Col>
          <Space>
            <Tooltip placement="top" title={dataRender.to.email}>
              <Typography.Text strong>{dataRender.to.name}</Typography.Text>
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
            <pre>{dataRender.myMessage}</pre>
          </Typography.Paragraph>
          <Card title="Chuyển tiếp từ ">
            <Typography.Paragraph>
              Từ:&nbsp;
              <Typography.Text strong>
                {dataRender.publisher.name} - {dataRender.publisher.email}
              </Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Đến:&nbsp;
              <Typography.Text strong>
                {dataRender.to.name} - {dataRender.to.email}
              </Typography.Text>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </>
  );
}
