import { Select, Space } from "antd";
import React from "react";

export default function DropdownFilter({ dataRender }) {
  function handleSelectChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <Space wrap>
      <Select defaultValue={dataRender[0].value} onChange={handleSelectChange}>
        {dataRender.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.title}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
}
