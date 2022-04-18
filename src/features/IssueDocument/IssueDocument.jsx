import { ArrowLeftOutlined, ArrowRightOutlined, SaveOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Form, message, Row, Space, Steps } from "antd";
import PlaneIcon from "components/Icons/PlaneIcon";
import FormIssuedDocument from "features/IssueDocument/FormStep/FormIssueDocument";
import PreviewIssueDocument from "features/IssueDocument/FormStep/PreviewIssueDocument";
import ResultMessage from "features/IssueDocument/FormStep/ResultMessage";
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
const Container = styled.div`
  padding: 10px 20px;
`;
const WrapForm = styled.div`
  padding: 20px;
  box-shadow: 0 0 40px rgb(0 0 0 / 16%);
  border-radius: 12px;
`;
const WrapAlert = styled.div`
  margin-bottom: 10px;
`;
const StepAction = styled.div`
  text-align: center;
`;
const ButtonReverse = styled(Button)`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  & > span {
    display: flex;
  }
  &.ant-btn > .anticon + span,
  .ant-btn > span {
    margin-right: 8px;
    margin-left: 0;
  }
`;
export default function IssueDocument({ visible, onCreate, onCancel, agencyId }) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState([]);
  const [selectedRelatedDocument, setSelectedRelatedDocument] = React.useState([]);
  const [formValuesDraft, setFormValuesDraft] = React.useState();
  const [modeSave, setModeSave] = React.useState("official");

  const [form] = Form.useForm();

  const handleSubmitFailed = (error) => {
    if (error) {
      message.error("Vui lòng không để trống các trường có dấu *");
    }
  };

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
    setModeSave("official");
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSaveDraftDocumentClick = () => {
    // form.submit();
    // handleSubmitForm();
    setModeSave("draft");
    setFormValuesDraft(formValues);
    setCurrentStep(steps[steps.length - 1].key);
  };
  const handleIssuanceDocumentClick = () => {
    form.submit();
    handleSubmitForm();
    setModeSave("official");
    setFormValuesDraft(formValues);
    setCurrentStep(steps[steps.length - 1].key);
  };
  return (
    <>
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Steps.Step key={item.key} title={item.title} />
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
                <FormIssuedDocument
                  form={form}
                  onSubmitForm={handleSubmitForm}
                  onSubmitFailed={handleSubmitFailed}
                  formValues={formValues}
                  currentStep={currentStep}
                  nextStep={nextStep}
                  onSelectRelatedDocument={(data) => setSelectedRelatedDocument(data)}
                  selectedRelatedDocument={selectedRelatedDocument}
                />
              </WrapForm>
            </Col>
          ) : steps[currentStep].key === 1 ? (
            <Col span={24}>
              <PreviewIssueDocument
                formValues={formValues}
                selectedRelatedDocument={selectedRelatedDocument}
              />
            </Col>
          ) : (
            <Col span={24}>
              <ResultMessage modeSave={modeSave} />
            </Col>
          )}
        </Row>
      </Container>
      <StepAction>
        {currentStep === 0 ? (
          <Space size="large">
            <Button
              type="default"
              size="large"
              onClick={() => handleSaveDraftDocumentClick()}
              icon={<SaveOutlined />}
            >
              Lưu bản nháp
            </Button>
            <ButtonReverse
              type="primary"
              size="large"
              onClick={() => nextStep()}
              icon={<ArrowRightOutlined />}
            >
              Tiếp theo
            </ButtonReverse>
          </Space>
        ) : currentStep === 1 ? (
          <Space size="large">
            <Button size="large" onClick={() => prevStep()} icon={<ArrowLeftOutlined />}>
              Quay lại
            </Button>
            <ButtonReverse
              size="large"
              type="primary"
              onClick={handleIssuanceDocumentClick}
              icon={<PlaneIcon />}
            >
              Ban hành ngay
            </ButtonReverse>
          </Space>
        ) : null}
      </StepAction>
    </>
  );
}
