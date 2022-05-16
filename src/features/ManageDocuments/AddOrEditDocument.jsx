import { ArrowLeftOutlined, ArrowRightOutlined, SaveOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Form, message, Row, Space, Steps, Typography } from "antd";
import { getUserId } from "app/selectors/auth";
import { getLoadingIssueDocument, getSuccessIssueDocument } from "app/selectors/documents";
import PlaneIcon from "components/Icons/PlaneIcon";
import LoadingOverlayApp from "components/LoadingOverlayApp";
import { fetchDocumentDetails } from "features/DocumentDetails/documentDetailsSlice";
import {
  fetchIssueDocumentDraft,
  fetchIssueDocumentOfficial,
  fetchUpdateDocument,
} from "features/ManageDocuments/documentsSlice";
import FormIssuedDocument from "features/ManageDocuments/FormStep/FormIssueDocument";
import PreviewIssueDocument from "features/ManageDocuments/FormStep/PreviewIssueDocument";
import ResultMessage from "features/ManageDocuments/FormStep/ResultMessage";
import RecipientDocument from "features/Recipients/RecipientsDocument";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
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
const Wrapper = styled.div``;
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
  padding: 20px;
`;

const ButtonReverse = styled(Button)`
  position: relative;
  overflow: hidden;
  padding-right: 0;
  vertical-align: middle;
  z-index: 1;
  cursor: pointer;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease,
    background 0.1s ease, -webkit-box-shadow 0.1s ease;
`;
const ButtonWrapText = styled.div`
  position: relative;
  margin-right: 15px;
  right: 0;
  transition: right 0.3s ease 0s;
  will-change: transform, opacity;
  ${ButtonReverse}:hover & {
    left: auto;
    right: 200%;
  }
`;

const ButtonWrapIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, opacity;
  transition: left 0.3s ease 0s;
  ${ButtonReverse}:hover & {
    left: 0;
  }
`;
export default function AddOrEditDocument() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState([]);
  const [modeSave, setModeSave] = React.useState(null);
  const [required, setRequired] = React.useState(true);
  const [selectedRecipient, setSelectedRecipient] = React.useState([]);
  const dispatch = useDispatch();
  const hasSuccess = useSelector(getSuccessIssueDocument);
  const isLoading = useSelector(getLoadingIssueDocument);
  const userId = useSelector(getUserId);
  const { slug } = useParams();

  React.useEffect(() => {
    if (slug) {
      dispatch(fetchDocumentDetails({ slug }));
    }
  }, [slug, dispatch]);

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
        values.type = modeSave;
        dispatch(fetchIssueDocumentDraft(values));
        setCurrentStep(steps[steps.length - 1].key);
      }
      setCurrentStep(currentStep + 1);
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

  const handleIssueOfficialDocument = (values) => {
    if (values) {
      const dataSubmit = formValues[formValues.length - 1];

      const participants =
        values.recipients.length > 0
          ? values.recipients.map((item) => {
              return {
                receiver: item,
                sender: userId,
                sendDate: new Date(dataSubmit.issueDate).getTime(),
              };
            })
          : {
              sender: userId,
              sendDate: new Date(dataSubmit.issueDate).getTime(),
            };
      dataSubmit.issueDate = new Date(dataSubmit.issueDate).getTime();
      dataSubmit.participants = participants;
      dataSubmit.type = modeSave;

      // dataSubmit.
      const formData = new FormData();
      for (const key in dataSubmit) {
        if (dataSubmit.hasOwnProperty(key)) {
          if (key === "files") {
            dataSubmit[key].fileList.forEach((file) => {
              formData.append(key, file.originFileObj);
            });
          } else if (key === "participants") {
            formData.append(key, JSON.stringify(dataSubmit[key]));
          } else {
            formData.append(key, dataSubmit[key]);
          }
        }
      }

      if (slug) {
        const formValues = {
          formData,
          documentId: slug,
        };
        dispatch(fetchUpdateDocument(formValues));
      } else {
        dispatch(fetchIssueDocumentOfficial(formData));
      }
    }
  };

  const handleSaveDraftDocumentClick = () => {
    setRequired(false);
    setModeSave("draft");
    form.submit();
  };

  const handleIssueDocumentClick = () => {
    setModeSave("official");
    form.submit();
  };

  return (
    <Wrapper>
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
                <LoadingOverlayApp
                  active={isLoading}
                  spinner={<HashLoader size={50} color="#36D7B7" />}
                >
                  <RecipientDocument
                    form={form}
                    onSubmitForm={handleIssueOfficialDocument}
                    onSelectRelatedRecipient={(data) => setSelectedRecipient(data)}
                    selectedRecipient={selectedRecipient}
                  />
                </LoadingOverlayApp>
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
            <ButtonReverse size="large" onClick={() => prevStep(currentStep)}>
              <ButtonWrapText>Quay lại</ButtonWrapText>
              <ButtonWrapIcon>
                <ArrowLeftOutlined />
              </ButtonWrapIcon>
            </ButtonReverse>
            <Button
              type="dashed"
              size="large"
              onClick={() => handleSaveDraftDocumentClick()}
              icon={<SaveOutlined />}
            >
              Lưu bản nháp
            </Button>
            <ButtonReverse type="primary" size="large" onClick={() => nextStep(currentStep)}>
              <ButtonWrapText>Tiếp theo</ButtonWrapText>
              <ButtonWrapIcon>
                <ArrowRightOutlined />
              </ButtonWrapIcon>
            </ButtonReverse>
          </Space>
        ) : currentStep === 1 ? (
          <Space size="large">
            <ButtonReverse size="large" onClick={() => prevStep(currentStep)}>
              <ButtonWrapText>Quay lại</ButtonWrapText>
              <ButtonWrapIcon>
                <ArrowLeftOutlined />
              </ButtonWrapIcon>
            </ButtonReverse>
            <Button
              type="dashed"
              size="large"
              onClick={() => handleSaveDraftDocumentClick()}
              icon={<SaveOutlined />}
            >
              Lưu bản nháp
            </Button>
            <ButtonReverse type="primary" size="large" onClick={() => nextStep(currentStep)}>
              <ButtonWrapText>Tiếp theo</ButtonWrapText>
              <ButtonWrapIcon>
                <ArrowRightOutlined />
              </ButtonWrapIcon>
            </ButtonReverse>
          </Space>
        ) : currentStep === 2 ? (
          <Space size="large">
            <ButtonReverse size="large" onClick={() => prevStep(currentStep)}>
              <ButtonWrapText>Quay lại</ButtonWrapText>
              <ButtonWrapIcon>
                <ArrowLeftOutlined />
              </ButtonWrapIcon>
            </ButtonReverse>
            <Button
              type="dashed"
              size="large"
              onClick={() => handleSaveDraftDocumentClick()}
              icon={<SaveOutlined />}
            >
              Lưu bản nháp
            </Button>
            <ButtonReverse size="large" type="primary" onClick={handleIssueDocumentClick}>
              <ButtonWrapText>{slug ? "Cập nhật và ban hành" : "Ban hành ngay"}</ButtonWrapText>
              <ButtonWrapIcon>
                <PlaneIcon />
              </ButtonWrapIcon>
            </ButtonReverse>
          </Space>
        ) : null}
      </StepAction>
    </Wrapper>
  );
}
