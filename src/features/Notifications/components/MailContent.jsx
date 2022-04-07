import { Card, Col, Collapse, Row, Typography } from "antd";
import DocumentDetail from "features/Home/pages/DocumentDetail";
import React from "react";

export default function MailContent() {
  return (
    <Row>
      <Col flex="auto">
        <Typography.Paragraph>
          <pre>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni dolorum ipsum doloribus
            sint earum temporibus odit, architecto ipsam hic non, consectetur, atque accusantium
            nobis. Odit voluptates sit eos iste sunt. Autem similique ratione itaque consequatur
            maiores quibusdam sit atque voluptatem optio eveniet! Dolorem, quo obcaecati repellat
            perspiciatis iusto accusantium ea eaque possimus asperiores odit nisi officia, eum iure
            alias commodi? Consequuntur corporis natus aspernatur mollitia minima autem beatae magni
            dolorem ab assumenda quia sint corrupti, rerum omnis commodi est, similique numquam
            tempore maxime qui! Assumenda in veritatis rerum consequuntur consequatur.
          </pre>
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
