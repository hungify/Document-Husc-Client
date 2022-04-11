import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tooltip, Typography } from "antd";
import React from "react";

export default function Analytics() {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <Row>
            <Col span={20}>
              <Typography.Title level={5}>Văn bản nháp</Typography.Title>
            </Col>
            <Col span={4} push={2}>
              <Tooltip placement="topLeft" title="Số văn bản nháp">
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Typography.Text>0 văn bản nháp</Typography.Text>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Row>
            <Col span={20}>
              <Typography.Title level={5}>Số văn bản đang chờ xử lý</Typography.Title>
            </Col>
            <Col span={4} push={2}>
              <Tooltip placement="topLeft" title="Số văn bản đang chờ xử lý">
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Typography.Text>2 văn bản đang chờ xử lý</Typography.Text>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Row>
            <Col span={20}>
              <Typography.Title level={5}>Số văn bản đã gửi</Typography.Title>
            </Col>
            <Col span={4} push={2}>
              <Tooltip placement="topLeft" title="Số văn bản đã gửi">
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Typography.Text>10 văn bản đã gửi</Typography.Text>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Row>
            <Col span={20}>
              <Typography.Title level={5}>Số văn bản đã xử lý</Typography.Title>
            </Col>
            <Col span={4} push={2}>
              <Tooltip placement="topLeft" title="Số văn bản đã xử lý">
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Typography.Text>10 văn bản đã xứ lý</Typography.Text>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
