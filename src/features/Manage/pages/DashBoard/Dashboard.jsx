import { Card, Col, Divider, Row, Tabs } from "antd";
import Analysis from "features/Manage/pages/Analysis/Analysis";
import React from "react";

export default function DashBoard() {
  return (
    <>
      <Row>
        <Col span={24}>
          <Analysis />
        </Col>
      </Row>
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
