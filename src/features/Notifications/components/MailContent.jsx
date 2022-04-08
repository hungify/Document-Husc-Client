import { Card, Col, Collapse, Row, Typography } from "antd";
import DocumentDetail from "features/Home/pages/DocumentDetail";
import React from "react";

export default function MailContent({ dataRender }) {
  return (
    <Row>
      <Col flex="auto">
        <Typography.Paragraph>
          <pre>{dataRender.message}</pre>
        </Typography.Paragraph>
      </Col>
      <Col flex="auto">
        <Card title="Nội dung văn bản">
          <Collapse defaultActiveKey={"document-content"}>
            <Collapse.Panel header="Thông tin văn bản" key="document-content">
              <DocumentDetail />
            </Collapse.Panel>
          </Collapse>
        </Card>
      </Col>
    </Row>
  );
}
