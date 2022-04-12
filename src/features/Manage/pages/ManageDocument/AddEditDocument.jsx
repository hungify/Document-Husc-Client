import { Alert, Button, Col, Form, Row, Space, Steps } from "antd";
import ButtonFlexible from "components/ButtonFlexible";
import CreateDocument from "features/Manage/components/CreateDocument";
import PreviewDocument from "features/Manage/components/PreviewDocument";
import ResultMessage from "features/Manage/components/ResultMessage";
import React from "react";
import styled from "styled-components";
const steps = [
  {
    key: 0,
    title: "Nhập văn bản",
  },
  {
    key: 1,
    title: "Kiểm lại thông tin",
  },
  {
    key: 2,
    title: "Kết thúc",
  },
];
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

export default function AddEditDocument({ visible, onCreate, onCancel, agencyId }) {
  const [currentStep, setCurrentStep] = React.useState(0);
  console.log('🚀 :: currentStep', currentStep)
  const [formValues, setFormValues] = React.useState([]);
  const [formValuesDraft, setFormValuesDraft] = React.useState();
  const [required, setRequired] = React.useState(true);

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
    form.submit();
    handleSubmitForm();
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSaveDraftDocumentClick = () => {
    form.submit();
    handleSubmitForm();
    setFormValuesDraft(formValues);
    setCurrentStep(steps[steps.length - 1].key);
  };
  const handleIssuanceDocumentClick = () => {};
  return (
    <WrapStep>
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Container>
        <Row>
          {steps[currentStep].key === 0 ? (
            <Col span={24}>
              <WrapAlert>
                <Alert
                  message="Để ban hành một văn bản bạn cần hoàn thành các bước sau"
                  type="info"
                  showIcon
                  closable
                />
              </WrapAlert>
              <WrapForm>
                <CreateDocument
                  form={form}
                  onSubmitForm={handleSubmitForm}
                  formValues={formValues}
                  currentStep={currentStep}
                  nextStep={nextStep}
                  required={required}
                />
              </WrapForm>
            </Col>
          ) : steps[currentStep].key === 1 ? (
            <Col span={24}>
              <PreviewDocument formValues={formValues} form={form} />
            </Col>
          ) : (
            <Col span={24}>
              <ResultMessage form={form} formValues={formValues} />
            </Col>
          )}
        </Row>
      </Container>
      <StepAction>
        {currentStep === 0 ? (
          <Space size="large">
            <Button type="default" size="large" onClick={() => handleSaveDraftDocumentClick()}>
              Lưu bản nháp
            </Button>
            <Button type="primary" size="large" onClick={() => nextStep()}>
              Tiếp theo
            </Button>
          </Space>
        ) : currentStep === 1 ? (
          <Space size={"large"}>
            <ButtonFlexible size="large" onDocumentClick={() => prevStep()}>
              Quay lại
            </ButtonFlexible>
            <ButtonFlexible
              size="large"
              type="primary"
              onDocumentClick={handleIssuanceDocumentClick}
            >
              Ban hành ngay
            </ButtonFlexible>
          </Space>
        ) : null}
      </StepAction>
    </WrapStep>
  );
}
