import { Button, Card, Col, Collapse, Divider, message, Row, Steps, Tabs } from "antd";
import AdminLayout from "layout/AdminLayout/AdminLayout";
import FirstStep from "pages/Admin/DashBoard/components/FirstStep";
import LastStep from "pages/Admin/DashBoard/components/LastStep";
import SecondStep from "pages/Admin/DashBoard/components/SecondStep";
import React from "react";
import styled from "styled-components";

const steps = [
  {
    title: "First",
  },
  {
    title: "Second",
  },
  {
    title: "Last",
  },
];
const WrapTabs = styled.div``;
const WrapStep = styled.div``;
const Container = styled.div`
  padding: 15px;
`;
const WrapForm = styled.div`
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 40px rgb(0 0 0 / 16%);
  border-radius: 12px;
`;
const StepAction = styled.div`
  text-align: center;
`;
export default function DashBoard() {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Collapse defaultActiveKey={["1"]}>
            <Collapse.Panel header="Thêm mới văn bản" key="1">
              <WrapStep>
                <Steps current={current}>
                  {steps.map((item) => (
                    <Steps.Step key={item.title} title={item.title} />
                  ))}
                </Steps>
                <Container>
                  <Row>
                    {steps[current].title === "First" ? (
                      <Col span={20} offset={2}>
                        <WrapForm>
                          <FirstStep />
                        </WrapForm>
                      </Col>
                    ) : steps[current].title === "Second" ? (
                      <Col span={10} offset={6}>
                        <WrapForm>
                          <SecondStep />
                        </WrapForm>
                      </Col>
                    ) : (
                      <Col span={10} offset={6}>
                        <WrapForm>
                          <LastStep />
                        </WrapForm>
                      </Col>
                    )}
                  </Row>
                </Container>
                <StepAction>
                  {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success("Processing complete!")}>
                      Done
                    </Button>
                  )}
                  {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                      Previous
                    </Button>
                  )}
                </StepAction>
              </WrapStep>
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <WrapTabs>
            <Card>
              <Tabs defaultActiveKey="1" type="card">
                <Tabs.TabPane tab="Dashboard" key="1">
                  Dashboard
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tạo mới văn bản" key="2"></Tabs.TabPane>
              </Tabs>
            </Card>
          </WrapTabs>
        </Col>
      </Row>
    </AdminLayout>
  );
}
