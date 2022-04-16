import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, Row, Space } from "antd";
import _ from "lodash";
import React from "react";
import styled from "styled-components";

const SpaceAnt = styled(Space)`
  margin-bottom: 5px;
`;
const plainOptions = [
  {
    label: "Tiêu đề",
    value: "title",
  },
  {
    label: "Cả hai",
    value: "both",
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
    setSearchType(value);
    if (value === "both") {
      setPlaceholder("Tìm theo tiêu đề, số hiệu văn bản");
    } else {
      const findBy = _.find(plainOptions, ["value", value]).label.toLowerCase();
      setPlaceholder(`Tìm theo ${findBy}`);
    }
  };

  return (
    <Row align="middle">
      <Col span={8}>
        <Form.Item name="check-type">
          <Radio.Group
            size="large"
            value={searchType}
            onChange={handleRadioChange}
            defaultValue={searchType}
          >
            {plainOptions.map((option) => (
              <SpaceAnt key={option.value} direction="vertical">
                <Radio value={option.value}>{option.label}</Radio>
              </SpaceAnt>
            ))}
          </Radio.Group>
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
            <Button type="primary" htmlType="submit" size="large" icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
          </Input.Group>
        </Form.Item>
      </Col>
    </Row>
  );
}
