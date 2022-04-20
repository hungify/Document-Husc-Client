import { Card, Form, message, Typography } from "antd";
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
  // React.useEffect(() => {
  //   form.setFieldsValue({
  //     ...formValues,
  //   });
  // }, [formValues]);

  // Document Classification
  const [typesOfDocuments, setTypesOfDocuments] = React.useState();
  const [categoryOfDocument, setCategoryOfDocument] = React.useState();
  const [agencyIssueDocument, setAgencyIssueDocument] = React.useState();
  // Document Classification

  // Document Property
  const [documentNumber, setDocumentNumber] = React.useState();
  const [urgentLevel, setUrgentLevel] = React.useState();
  const [issuedDate, setIssuedDate] = React.useState();
  const [signerDocument, setSignerDocument] = React.useState();
  // Document Property

  // Document Content
  const [documentFrom, setDocumentFrom] = React.useState(dataRadio[1].value);
  // const [titleDocument, setTitleDocument] = React.useState();
  //option one
  const [fileList, setFileList] = React.useState([]);
  // const [summaryDocument, setSummaryDocument] = React.useState();
  //option two
  // const [contentDocument, setContentDocument] = React.useState();

  // Document Classification
  const handleTypesOfDocumentSelect = (value) => {
    setTypesOfDocuments(value);
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

  // const handleTitleDocumentChange = (e) => {
  //   setTitleDocument(e.target.value);
  // };

  // const handleContentDocumentChange = (e) => {
  //   setContentDocument(e.target.value);
  // }
  // Document Content

  // const handleSummaryDocumentChange = (value) => {
  //   setSummaryDocument(value);
  // };

  // const handleUploadFileChange = (info) => {
  //   const { status } = info.file;
  //   if (status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

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
          typesOfDocuments={typesOfDocuments}
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
          // summaryValue={summaryDocument}
          // onSummaryChange={handleSummaryDocumentChange}
          // titleDocument={titleDocument}
          // onTitleDocumentChange={handleTitleDocumentChange}
          // contentDocument={contentDocument}
          // onContentDocumentChange={handleContentDocumentChange}

          required={required}
        />
      </CardAnt>
      <CardAnt title={<Typography.Text strong>Văn bản liên quan</Typography.Text>}>
        <RelatedDocuments relatedDocuments={formValues?.relatedDocuments} />
      </CardAnt>
    </Form>
  );
}
