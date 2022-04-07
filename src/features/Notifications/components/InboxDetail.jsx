import { Avatar, Button, Card, Col, Collapse, Row, Space, Tooltip, Typography } from "antd";
import DocumentDetail from "features/Home/pages/DocumentDetail";
import MailContent from "features/Notifications/components/MailContent";
import MailInfo from "features/Notifications/components/MailInfo";
import React from "react";

export default function InboxDetail() {
  return (
    <Card title="Nội dung thông báo" extra={<Button type="primary">Chuyển tiếp</Button>}>
      <MailInfo />
      <MailContent />
    </Card>
  );
}
