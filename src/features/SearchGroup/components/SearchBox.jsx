import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, Row } from "antd";
import React from "react";

const plainOptions = [
  {
    label: "Cả hai",
    value: "both",
  },
  {
    label: "Tiêu đề",
    value: "title",
  },
  {
    label: "Số hiệu văn bản",
    value: "document_number",
  },
];

export default function SearchBox(props) {
  const [placeholder, setPlaceholder] = React.useState("Tìm theo tiêu đề");
  const [searchType, setSearchType] = React.useState(plainOptions[0].value);

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSearchType(value.toLowerCase());
    if (value === "Cả hai") {
      setPlaceholder("Tìm theo tiêu đề, số hiệu văn bản");
    } else {
      setPlaceholder(`Tìm theo ${value.toLowerCase()}`);
    }
  };

  return (
    <Row gutter={[20, 5]} align="middle">
      <Col span={8}>
        <Form.Item name="check-type">
          <Radio.Group
            options={plainOptions}
            value={searchType}
            defaultValue={searchType}
            onChange={handleRadioChange}
          />
        </Form.Item>
      </Col>
      <Col span={16}>
        <Form.Item name="search-term">
          <Input.Group
            compact
            style={{
              display: "flex",
            }}
          >
            <Input allowClear placeholder={placeholder} size="large" />
          </Input.Group>
        </Form.Item>
      </Col>
    </Row>
  );
}
