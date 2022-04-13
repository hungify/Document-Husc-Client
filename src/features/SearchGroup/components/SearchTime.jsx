import { Col, DatePicker, Form, Row, Select, Typography } from "antd";
import SelectForm from "components/SelectForm";
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
  const handleSelectDateTypeChange = (value) => {};
  return (
    <>
      <Row gutter={[20, 15]}>
        <Col span={24}>
          <Typography.Text strong>Tìm theo ngày phát hành trong khoảng thời gian</Typography.Text>
        </Col>
        <Col span={8}>
          <Form.Item name="time-type">
            <SelectForm
              selectData={options}
              onSelectChange={handleSelectDateTypeChange}
              selectedKey={selectedDateType}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="date-picker">
            <DatePicker.RangePicker
              size="large"
              format="DD/MM/YYYY"
              onChange={onDatePickerChange}
              onOk={onDateOk}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
