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
import Analytics from "features/Dashboard/Analytics";
import React from "react";
import { useLocation } from "react-router-dom";

const analytics = {
  adminLayout: [
    {
      title: "Số văn bản",
      key: "document-total",
      value: 60,
      icon: <SnippetsOutlined size="large" />,
    },
    {
      title: "Số chuyên mục",
      key: "category-total",
      value: 10,
      icon: <AppstoreOutlined size="large" />,
    },
    {
      title: "Số cơ quan ban hành",
      key: "agency-total",
      value: 10,
      icon: <AuditOutlined size="large" />,
    },
  ],
  userLayout: [
    {
      title: "Văn bản nháp",
      key: "document-draft",
      value: 2,
      icon: <FormOutlined size="large" />,
    },
    {
      title: "Văn bản chờ xử lý",
      key: "document-pending",
      value: 3,
      icon: <ClockCircleOutlined size="large" />,
    },
    {
      title: "Văn bản đã xử lý",
      key: "document-approved",
      value: 10,
      icon: <CheckCircleOutlined size="large" />,
    },
    {
      title: "Văn bản đã gửi",
      key: "document-sent",
      value: 20,
      icon: <SendOutlined size="large" />,
    },
  ],
};

export default function DashBoard() {
  const { pathname } = useLocation();

  return (
    <>
      <Analytics
        dataRender={pathname === "/m/dashboard" ? analytics.adminLayout : analytics.userLayout}
      />
      <Divider />
      <Row>
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
      </Row>
    </>
  );
}
