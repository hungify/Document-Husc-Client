import { SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import React from "react";

const plainOptions = ["Cụm từ chính xác", "Số hiệu văn bản"];

export default function SearchBox(props) {
  const [checkedList, setCheckedList] = React.useState();
  const [placeholder, setPlaceholder] = React.useState("Tìm theo tiêu đề");

  const handleCheckboxChange = (checkedList) => {
    const newList = checkedList.map((checked) => checked.toLowerCase());
    setCheckedList(checkedList);
    if (newList.length === 0) {
      setPlaceholder("Tìm theo tiêu đề");
    } else {
      setPlaceholder(`Tìm theo ${newList.join(", ")}`);
    }
  };

  return (
    <Row gutter={[20, 5]} align="middle">
      <Col span={8}>
        <Form.Item name="check-type">
          <Checkbox.Group
            options={plainOptions}
            value={checkedList}
            onChange={handleCheckboxChange}
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
            <Button type="primary" htmlType="submit" size="large" icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
          </Input.Group>
        </Form.Item>
      </Col>
    </Row>
  );
}
