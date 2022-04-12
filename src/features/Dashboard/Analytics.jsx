import { Card, Col, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  text-align: center;
  background: #1890ff;
  color: #fff;
  border-radius: 0.5rem;
  line-height: 48px;
`;

const WrapTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Analytics({ dataRender }) {
  return (
    <Row gutter={[10, 10]}>
      {dataRender.map((item) => (
        <Col span={dataRender.length > 3 ? 6 : 8} key={item.key}>
          <Card>
            <Row>
              <Col span={24}>
                <WrapTitle>
                  <div>
                    <Typography.Text type="secondary">
                      <Typography.Title level={4}>{item.title}</Typography.Title>
                    </Typography.Text>
                    <Typography.Title level={5}>
                      <Typography.Text type="secondary">{item.value}</Typography.Text>
                    </Typography.Title>
                  </div>
                  <IconBox>{item.icon}</IconBox>
                </WrapTitle>
              </Col>
            </Row>
            <Row></Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
