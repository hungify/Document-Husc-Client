import { Select, Space } from "antd";
import React from "react";

export default function DropdownFilter() {
  function handleSelectChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <Space wrap>
      <Select defaultValue="Mới ban hành" onChange={handleSelectChange}>
        <Select.Option value="Mới ban hành">Mới ban hành</Select.Option>
        <Select.Option value="Mới cập nhật">Mới cập nhất</Select.Option>
      </Select>
    </Space>
  );
}
