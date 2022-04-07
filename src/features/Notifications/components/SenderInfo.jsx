import { Tabs } from "antd";
import React from "react";

export default function SenderInfo() {
  const [activeTab, setActiveTab] = React.useState(0);
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Tabs defaultActiveKey="1" type="card" size={"large"} onChange={handleTabChange}>
      <Tabs.TabPane tab="Thông tin người gửi" key="1"></Tabs.TabPane>
      <Tabs.TabPane tab="Thông tin người nhận" key="2">
        
      </Tabs.TabPane>
    </Tabs>
  );
}
