import { Button, Card, Col, Form, Row, Space } from "antd";
import FirstStep from "features/Manage/components/FirstStep";
import SecondStep from "features/Manage/components/SecondStep";
import ThirdStep from "features/Manage/components/ThirdStep";
import React from "react";

export default function LastStep({ goToStep }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row>
        <Col span={24}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Card
              title="First step"
              extra={<Button onClick={() => goToStep(0)}>Go to first step</Button>}
            >
              <FirstStep />
            </Card>
            <Card
              title="Second step"
              extra={<Button onClick={() => goToStep(1)}>Go to second step</Button>}
            >
              <SecondStep />
            </Card>
            <Card
              title="Third step"
              extra={<Button onClick={() => goToStep(2)}>Go to third step</Button>}
            >
              <ThirdStep />
            </Card>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
