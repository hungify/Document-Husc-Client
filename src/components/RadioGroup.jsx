import { Radio } from "antd";

export default function RadioGroup({dataRadio, onRadioChange, valueRadio}) {
  return (
    <Radio.Group onChange={onRadioChange} value={valueRadio}>
      {dataRadio.map((item, index) => (
        <Radio value={item.value} key={item.value}>
          {item.label}
        </Radio>
      ))}
    </Radio.Group>
  );
}
