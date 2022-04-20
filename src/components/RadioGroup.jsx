import { Radio } from "antd";

export default function RadioGroup({ dataRadio, onChange, value, ...restProps }) {
  return (
    <Radio.Group {...restProps} onChange={onChange} value={value} defaultValue={value}>
      {dataRadio.map((item) => (
        <Radio value={item.value} key={item.value}>
          {item.label}
        </Radio>
      ))}
    </Radio.Group>
  );
}
