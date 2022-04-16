import Icon, { SwapOutlined } from "@ant-design/icons";
import { Radio, Space, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const IconAnt = styled(Icon)`
  transform: rotate(90deg);
`;

export default function SortFilter({ dataRadio, onRadioChange, ...restProps }) {
  const [value, setValue] = React.useState(dataRadio[0].value);

  const handleRadioChange = (e) => {
    setValue(e.target.value);
    onRadioChange(e.target.value);
  };

  return (
    <Space>
      <IconAnt component={SwapOutlined} size="large" />
      <Typography.Text strong>Sắp xếp theo</Typography.Text>
      <Radio.Group onChange={handleRadioChange} value={value} size="large" {...restProps}>
        {dataRadio.map((item, index) => (
          <Radio value={item.value} key={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </Space>
  );
}
