import { ArrowLeftOutlined, ArrowRightOutlined, SaveOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Form, message, Row, Space, Steps, Typography } from "antd";
import { getLoadingIssueDocument, getSuccessIssueDocument } from "app/selectors/issueDocument";
import PlaneIcon from "components/Icons/PlaneIcon";
import LoadingOverlay from "components/LoadingOverlay";
import FormIssuedDocument from "features/IssueDocument/FormStep/FormIssueDocument";
import PreviewIssueDocument from "features/IssueDocument/FormStep/PreviewIssueDocument";
import RecipientDocument from "features/IssueDocument/FormStep/RecipientDocument";
import ResultMessage from "features/IssueDocument/FormStep/ResultMessage";
import { issueDocumentOfficial } from "features/IssueDocument/issueDocumentSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
    title: "Chọn người nhận",
  },
  {
    key: 3,
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

export default function IssueDocument() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState([]);
  const [modeSave, setModeSave] = React.useState(null);
  const [required, setRequired] = React.useState(true);
  const [selectedRecipient, setSelectedRecipient] = React.useState([]);
  const dispatch = useDispatch();
  const hasSuccess = useSelector(getSuccessIssueDocument);
  const isLoading = useSelector(getLoadingIssueDocument);

  React.useEffect(() => {
    if (hasSuccess && !isLoading && currentStep === 2) {
      setCurrentStep(currentStep + 1);
    }
  }, [hasSuccess, isLoading]);

  const [form] = Form.useForm();

  const handleSubmitFailed = (error) => {
    if (error) {
      message.error("Vui lòng không để trống các trường có dấu *");
    }
  };

  const handleSubmitForm = (values) => {
    if (values) {
      console.log("🚀 :: values", values);
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
      if (modeSave === "draft") {
        setCurrentStep(steps[steps.length - 1].key);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const nextStep = (currentStep) => {
    if (currentStep === 0) {
      setRequired(true);
      form.submit();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (currentStep) => {
    setCurrentStep(+currentStep - 1);
  };

  const handleIssuedDocument = (values) => {
    if (values) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSaveDraftDocumentClick = () => {
    setRequired(false);
    setModeSave("draft");
    form.submit();
    // save draft
  };

  const handleIssuanceDocumentClick = async () => {
    setModeSave("official");
    const data = formValues[formValues.length - 1];

    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === "files") {
          data[key].fileList.forEach((file) => {
            formData.append(key, file.originFileObj);
          });
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    formData.append("publisher", "6262d3736129d8ca00aa894d");
    formData.append("publishDate", new Date());

    dispatch(issueDocumentOfficial(formData));
    // if don't go to next step
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
                  required={required}
                  onSubmitForm={handleSubmitForm}
                  onSubmitFailed={handleSubmitFailed}
                  currentStep={currentStep}
                  nextStep={nextStep}
                  formValues={formValues[formValues.length - 1]}
                />
              </WrapForm>
            </Col>
          ) : steps[currentStep].key === 1 ? (
            <Col span={24}>
              <PreviewIssueDocument formValues={formValues[formValues.length - 1]} />
            </Col>
          ) : steps[currentStep].key === 2 ? (
            <Col span={24}>
              <WrapAlert>
                <Alert
                  message={
                    <Typography.Text strong>
                      Văn bản sẽ được ban hành công khai nếu danh sách người nhận trống
                    </Typography.Text>
                  }
                  type="warning"
                  showIcon
                />
              </WrapAlert>
              <WrapForm>
                <LoadingOverlay active={isLoading}>
                  <RecipientDocument
                    form={form}
                    onSubmitForm={handleIssuedDocument}
                    onSelectRelatedRecipient={(data) => setSelectedRecipient(data)}
                    selectedRecipient={selectedRecipient}
                  />
                </LoadingOverlay>
              </WrapForm>
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
              onClick={() => nextStep(currentStep)}
              icon={<ArrowRightOutlined />}
            >
              Tiếp theo
            </ButtonReverse>
          </Space>
        ) : currentStep === 1 ? (
          <Space size="large">
            <Button size="large" onClick={() => prevStep(currentStep)} icon={<ArrowLeftOutlined />}>
              Quay lại
            </Button>
            <ButtonReverse
              type="primary"
              size="large"
              onClick={() => nextStep(currentStep)}
              icon={<ArrowRightOutlined />}
            >
              Tiếp theo
            </ButtonReverse>
          </Space>
        ) : currentStep === 2 ? (
          <Space size="large">
            <Button size="large" onClick={() => prevStep(currentStep)} icon={<ArrowLeftOutlined />}>
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
