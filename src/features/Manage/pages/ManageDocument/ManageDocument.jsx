import { Col, Row } from "antd";
import ListDocument from "features/Manage/pages/ManageDocument/ListDocument";
import React from "react";

export default function ManageDocument() {
  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <ListDocument />
      </Col>
    </Row>
  );
}
