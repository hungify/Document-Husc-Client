import { Card, Col, Row, Typography } from "antd";
import { getRole } from "app/selectors/authSelector";
import { analyticsConfig } from "configs/dashboard";
import { ROLES } from "configs/roles";
import Analytics from "features/Dashboard/Analytics";
import NotificationList from "features/NotificationList/NotificationList";
import React from "react";
import { useSelector } from "react-redux";

export default function DashBoard() {
  const role = useSelector(getRole);

  return (
    <>
      {role === ROLES.ADMIN ? (
        <>
          <Analytics dataRender={analyticsConfig[ROLES.USER]} />
          <Analytics dataRender={analyticsConfig[ROLES.ADMIN]} />
        </>
      ) : (
        <Analytics dataRender={analyticsConfig[ROLES.USER]} />
      )}

      <Card bordered={false}>
        <Row gutter={[10, 10]}>
          <Col span={16}>
            <Typography.Text strong>Danh sách thông báo</Typography.Text>
          </Col>
          <Col span={24}>
            <NotificationList />
          </Col>
        </Row>
      </Card>
    </>
  );
}
