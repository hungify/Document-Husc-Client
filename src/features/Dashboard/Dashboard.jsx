import {
  AppstoreOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FormOutlined,
  SendOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Card, Col, Divider, Row, Tabs } from "antd";
import { getRole } from "app/selectors/authSelector";
import { analyticsConfig } from "configs/dashboard";
import { ROLES } from "configs/roles";
import Analytics from "features/Dashboard/Analytics";
import React from "react";
import { useSelector } from "react-redux";

export default function DashBoard() {
  const role = useSelector(getRole);

  return (
    <>
      {role === ROLES.ADMIN && (
        <>
          <Analytics dataRender={analyticsConfig[ROLES.USER]} />
          <Analytics dataRender={analyticsConfig[ROLES.ADMIN]} />
        </>
      )}
      {/* <Row>
        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="1" type="card">
              <Tabs.TabPane tab="Dashboard" key="1">
                <Row>
                  <Col>Empty tab</Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Something" key="2">
                <Row>
                  <Col>Empty tab</Col>
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row> */}
    </>
  );
}
