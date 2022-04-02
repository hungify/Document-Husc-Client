import { Alert, Button, Card, Col, Collapse, Divider, Form, message, Row, Steps, Tabs } from "antd";
import AdminLayout from "layout/AdminLayout/AdminLayout";
import FirstStep from "pages/Admin/components/FirstStep";
import LastStep from "pages/Admin/components/LastStep";
import SecondStep from "pages/Admin/components/SecondStep";
import ThirdStep from "pages/Admin/components/ThirdStep";
import React from "react";
import styled from "styled-components";

const steps = [
  {
    key: 1,
    title: "First",
  },
  {
    key: 2,
    title: "Second",
  },
  {
    key: 3,
    title: "Third",
  },
  {
    key: 4,
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
const WrapAlert = styled.div`
  margin-bottom: 20px;
`;
const StepAction = styled.div`
  text-align: center;
`;

export default function DashBoard() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState([]);

  const [form] = Form.useForm();

  const handleSubmitForm = (values) => {
    if (values) {
      if (formValues.length > 0) {
        const newFormValues = formValues.map((item, i) => {
          if (item.step === values.step) {
            return {
              ...item,
              ...values,
            };
          }
          return item;
        });

        setFormValues([...newFormValues, { ...values }]);
      } else {
        setFormValues([{ ...values }]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const nextStep = () => {
    // form.submit();
    // handleSubmitForm();
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  console.log("🚀 :: steps[currentStep].", steps[currentStep]);
  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Collapse defaultActiveKey={["1"]}>
            <Collapse.Panel header="Thêm mới văn bản" key="1">
              <WrapStep>
                <Steps current={currentStep}>
                  {steps.map((item) => (
                    <Steps.Step key={item.title} title={item.title} />
                  ))}
                </Steps>
                <Container>
                  <Row>
                    {steps[currentStep].title === "First" ? (
                      <Col span={20} offset={2}>
                        <WrapAlert>
                          <Alert
                            message="Để đăng lên một văn bản bạn cần hoàn thành các bước sau"
                            type="info"
                            showIcon
                            closable
                          />
                        </WrapAlert>
                        <WrapForm>
                          <FirstStep
                            form={form}
                            onSubmitForm={handleSubmitForm}
                            formValues={formValues}
                          />
                        </WrapForm>
                      </Col>
                    ) : steps[currentStep].title === "Second" ? (
                      <Col span={20} offset={2}>
                        <WrapForm>
                          <SecondStep form={form} onSubmitForm={handleSubmitForm} />
                        </WrapForm>
                      </Col>
                    ) : steps[currentStep].title === "Third" ? (
                      <Col span={20} offset={2}>
                        <WrapForm>
                          <ThirdStep form={form} onSubmitForm={handleSubmitForm} />
                        </WrapForm>
                      </Col>
                    ) : (
                      <Col span={24}>
                        <WrapForm>
                          <LastStep
                            form={form}
                            onSubmitForm={handleSubmitForm}
                            goToStep={goToStep}
                          />
                        </WrapForm>
                      </Col>
                    )}
                  </Row>
                </Container>
                <StepAction>
                  {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={() => nextStep()}>
                      Tiếp theo
                    </Button>
                  )}
                  {currentStep === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success("Processing complete!")}>
                      Tải lên
                    </Button>
                  )}
                  {currentStep > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prevStep()}>
                      Quay lại
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
