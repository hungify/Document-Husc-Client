import { Card, Col, Row } from "antd";
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
export default function Forward() {
  return (
    <Row>
      <ColAnt span={24}>
        <Card size="small">
          <NotificationList />
        </Card>
      </ColAnt>
    </Row>
  );
}
