import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tooltip, Typography } from "antd";
import React from "react";

export default function Analysis() {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <Row>
            <Col span={20}>
              <Typography.Title level={5}>Số văn bản</Typography.Title>
            </Col>
            <Col span={4} push={2}>
              <Tooltip placement="topLeft" title="Số văn bản đã phát hành">
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Typography.Text>523 văn bản đã phát hành</Typography.Text>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Row>
            <Col span={20}>
              <Typography.Title level={5}>Số chuyên mục</Typography.Title>
            </Col>
            <Col span={4} push={2}>
              <Tooltip placement="topLeft" title="Số chuyên mục đã được tạo">
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Typography.Text>10 chuyên mục đã được tạo</Typography.Text>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Row>
            <Col span={20}>
              <Typography.Title level={5}>Số cơ quan ban hành</Typography.Title>
            </Col>
            <Col span={4} push={2}>
              <Tooltip placement="topLeft" title="Số cơ quan ban hành đã được tạo">
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Typography.Text>10 cơ quan ban hành đã được tạo</Typography.Text>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Row>
            <Col span={20}>
              <Typography.Title level={5}>Số loại văn bản</Typography.Title>
            </Col>
            <Col span={4} push={2}>
              <Tooltip placement="topLeft" title="Số loại văn bản đã được tạo">
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Typography.Text>10 loại văn bản đã được tạo</Typography.Text>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
