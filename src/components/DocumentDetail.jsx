import { Tabs } from "antd";
import PreviewPdf from "components/PreviewPdf";
import SummaryTable from "components/SummaryTable";
import React from "react";

export default function DocumentDetail() {
  const [activeTab, setActiveTab] = React.useState(0);
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  return (
    <Tabs defaultActiveKey="1" type="card" size={"large"} onChange={handleTabChange}>
      <Tabs.TabPane tab="Tóm tắt" key="1">
        <SummaryTable />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Văn bản gốc" key="2">
        <PreviewPdf activeTab={activeTab} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Văn bản liên quan" key="3">
        Văn bản liên quan
      </Tabs.TabPane>
      <Tabs.TabPane tab=" Cây xử lý" key="4">
        Cây xử lý
      </Tabs.TabPane>
    </Tabs>
  );
}
