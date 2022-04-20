import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, DatePicker, Form, Radio, Row, Space } from "antd";
import React from "react";

const options = [
  {
    label: "Ngày ban hành",
    value: "date_issued",
  },
  {
    label: "Ngày cập nhật",
    value: "date_updated",
  },
];

export default function SearchTime(props) {
  const { onDatePickerChange, onSelectDateChange, onDateOk } = props;
  const [selectedDateType, setSelectedDateType] = React.useState(options[0].value);
  const handleRadioChange = (value) => {
    setSelectedDateType(value);
  };
  return (
    <Row align="middle">
      <Col span={6}>
        <Form.Item name="timeType" initialValue={selectedDateType}>
          <Radio.Group value={selectedDateType} onChange={handleRadioChange}>
            <Space direction="vertical">
              {options.map((option) => (
                <Radio value={option.value} key={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="startDate">
          <DatePicker
            size="large"
            placeholder="Từ ngày"
            format="DD/MM/YYYY"
            onChange={onDatePickerChange}
            onOk={onDateOk}
          />
        </Form.Item>
      </Col>
      <Col span={1}>
        <Form.Item>
          <ArrowRightOutlined />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="endDate">
          <DatePicker
            placeholder="Đến ngày"
            size="large"
            format="DD/MM/YYYY"
            onChange={onDatePickerChange}
            onOk={onDateOk}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}
