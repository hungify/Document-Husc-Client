import { Button, Card, Collapse } from "antd";
import DocumentDetail from "features/Home/pages/DocumentDetail";
import SenderInfo from "features/Notifications/components/SenderInfo";
import React from "react";

export default function InboxDetail() {
  return (
    <Card title="Nội dung văn bản" extra={<Button type="primary">Chuyển tiếp</Button>}>
      <Collapse defaultActiveKey={["1"]} onChange={() => {}}>
        <Collapse.Panel header="Thông tin khác" key="1">
          <SenderInfo />
        </Collapse.Panel>
        <Collapse.Panel header="Thông tin văn bản" key="2">
          <DocumentDetail />
        </Collapse.Panel>
      </Collapse>
    </Card>
  );
}
