import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Form, Radio, Row, Space } from "antd";
import { DatePicker } from "components/customs";
import React from "react";

const options = [
  {
    label: "Ngày ban hành",
    value: "createdAt",
  },
  {
    label: "Ngày cập nhật",
    value: "updatedAt",
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
        <Form.Item name="orderBy" initialValue={selectedDateType}>
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
        <Form.Item name="start">
          <DatePicker
            size="large"
            placeholder="Từ ngày"
            format="DD/MM/YYYY"
            // onChange={onDatePickerChange}
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
        <Form.Item name="end">
          <DatePicker
            placeholder="Đến ngày"
            size="large"
            format="DD/MM/YYYY"
            // onChange={onDatePickerChange}
            onOk={onDateOk}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}
