import { Card, Col, Divider, Radio, Row } from "antd";
import NotificationList from "features/Notifications/components/NotificationList";
import React from "react";
import styled from "styled-components";

const ColAnt = styled(Col)`
  :not(:first-child) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default function Inbox() {
  const [filterType, setFilterType] = React.useState("all");

  return (
    <Row>
      <ColAnt span={24}>
        <Card size="small">
          <Radio.Group
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
            value={filterType}
          >
            <Radio value="all">Tất cả</Radio>
            <Radio value="unread">Chưa đọc</Radio>
          </Radio.Group>
          <Divider />
          <NotificationList filterType={filterType} />
        </Card>
      </ColAnt>
    </Row>
  );
}
