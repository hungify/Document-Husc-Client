import { Card, Form, Typography } from "antd";
import dayjs from "dayjs";
import RelatedDocuments from "features/IssueDocument/components/RelatedDocuments";
import DocumentClassification from "features/IssueDocument/FormGroup/DocumentClassification";
import DocumentContent from "features/IssueDocument/FormGroup/DocumentContent";
import DocumentProperty from "features/IssueDocument/FormGroup/DocumentProperty";
import React from "react";
import styled from "styled-components";

const CardAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const dataRadio = [
  {
    label: "Từ tệp",
    value: "attach",
  },
  {
    label: "Nhập vào",
    value: "input",
  },
];

export default function FormIssuedDocument({
  form,
  onSubmitForm,
  formValues,
  onSubmitFailed,
  required,
}) {
  // Document Classification
  const [typesOfDocument, setTypesOfDocument] = React.useState("quyet-dinh");
  const [categoryOfDocument, setCategoryOfDocument] = React.useState("khoa-hoc-cong-nghe");
  const [agencyIssueDocument, setAgencyIssueDocument] = React.useState("dai-hoc-hue");
  // Document Classification

  // Document Property
  const [documentNumber, setDocumentNumber] = React.useState("015/NQ-HĐĐH");
  const [urgentLevel, setUrgentLevel] = React.useState("binh-thuong");
  const [issuedDate, setIssuedDate] = React.useState(dayjs(new Date()));
  const [signerDocument, setSignerDocument] = React.useState("Nguyễn Vũ Quốc Huy");
  // Document Property

  // Document Content
  const [documentFrom, setDocumentFrom] = React.useState(
    formValues?.documentFrom || dataRadio[0].value
  );
  const [titleDocument, setTitleDocument] = React.useState("This is my title");
  //option one
  const [summaryDocument, setSummaryDocument] = React.useState("This is my summary");
  //option two
  const [contentDocument, setContentDocument] = React.useState("This is my content");

  const [fileList, setFileList] = React.useState(formValues?.files?.fileList || []);

  const [selectedRelatedDocument, setSelectedRelatedDocument] = React.useState(
    formValues?.relatedDocuments || []
  );

  // Document Classification
  const handleTypesOfDocumentSelect = (value) => {
    setTypesOfDocument(value);
  };

  const handleCategoryOfDocumentSelect = (value) => {
    setCategoryOfDocument(value);
  };

  const handleCategoryOfDocumentDeSelect = () => {};

  const handleAgencyIssueDocumentSelect = (value) => {
    setAgencyIssueDocument(value);
  };
  // Document Classification

  // Document Property
  const handleUrgentLevelSelect = (value) => {
    setUrgentLevel(value);
  };

  const handleIssuedDateChange = (value) => {
    setIssuedDate(value);
  };

  const handleSignerDocumentChange = (value) => {
    setSignerDocument(value);
  };

  const handleDocumentNumberChange = (value) => {
    setDocumentNumber(value);
  };
  // Document Property

  // Document Content
  const handleDocumentFromChange = (e) => {
    setDocumentFrom(e.target.value);
  };

  const handleTitleDocumentChange = (e) => {
    setTitleDocument(e.target.value);
  };

  const handleContentDocumentChange = (e) => {
    setContentDocument(e.target.value);
  };

  const handleSummaryDocumentChange = (value) => {
    setSummaryDocument(value);
  };
  // Document Content

  return (
    <Form
      name="issue-document"
      form={form}
      onFinish={onSubmitForm}
      onFinishFailed={onSubmitFailed}
      layout="vertical"
    >
      <CardAnt title={<Typography.Text strong>Thông tin phân loại văn bản</Typography.Text>}>
        <DocumentClassification
          typesOfDocument={typesOfDocument}
          onTypesOfDocumentSelect={handleTypesOfDocumentSelect}
          categoryOfDocument={categoryOfDocument}
          onCategoryOfDocumentSelect={handleCategoryOfDocumentSelect}
          onCategoryOfDocumentDeSelect={handleCategoryOfDocumentDeSelect}
          agencyIssueDocument={agencyIssueDocument}
          onAgencyIssueDocumentSelect={handleAgencyIssueDocumentSelect}
          required={required}
        />
      </CardAnt>

      <CardAnt title={<Typography.Text strong>Thuộc tính của văn bản</Typography.Text>}>
        <DocumentProperty
          urgentLevelSelected={urgentLevel}
          onUrgentLevelSelect={handleUrgentLevelSelect}
          issuedDate={issuedDate}
          onIssuedDateChange={handleIssuedDateChange}
          signerDocument={signerDocument}
          onSignerDocumentChange={handleSignerDocumentChange}
          documentNumber={documentNumber}
          onDocumentNumberChange={handleDocumentNumberChange}
          required={required}
        />
      </CardAnt>

      <CardAnt title={<Typography.Text strong>Nội dung của văn bản</Typography.Text>}>
        <DocumentContent
          documentFrom={documentFrom}
          dataRadio={dataRadio}
          onDocumentFromChange={handleDocumentFromChange}
          summaryValue={summaryDocument}
          onSummaryChange={handleSummaryDocumentChange}
          titleDocument={titleDocument}
          onTitleDocumentChange={handleTitleDocumentChange}
          contentDocument={contentDocument}
          onContentDocumentChange={handleContentDocumentChange}
          fileList={fileList}
          setFileList={setFileList}
          required={required}
        />
      </CardAnt>
      <CardAnt title={<Typography.Text strong>Văn bản liên quan</Typography.Text>}>
        <RelatedDocuments
          selectedRelatedDocument={selectedRelatedDocument}
          setSelectedRelatedDocument={setSelectedRelatedDocument}
        />
      </CardAnt>
    </Form>
  );
}
