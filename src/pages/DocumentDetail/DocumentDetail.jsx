import { Col, Row, Tabs } from "antd";
import PreviewPdf from "components/PreviewPdf";
import SummaryTable from "components/SummaryTable";
import GuestLayout from "layout/GuestLayout/GuestLayout";
import React from "react";

export default function DocumentDetail() {
  const [activeTab, setActiveTab] = React.useState(0);
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  return (
    <GuestLayout>
      <Row>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" size={"large"} onChange={handleTabChange}>
            <Tabs.TabPane tab="Tóm tắt" key="1">
              <SummaryTable />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Nội dung" key="2">
              <PreviewPdf activeTab={activeTab} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Văn bản liên quan" key="3">
              Văn bản liên quan
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lược đồ" key="4">
              Lược đồ
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </GuestLayout>
  );
}
