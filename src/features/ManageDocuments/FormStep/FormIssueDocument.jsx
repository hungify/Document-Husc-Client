import { Card, Form, Typography } from "antd";
import {
  getFiles,
  getParticipants,
  getProperty,
  getRelatedDocuments,
} from "app/selectors/documentDetails";
import dayjs from "dayjs";
import RelatedDocuments from "features/ManageDocuments/components/RelatedDocuments";
import DocumentClassification from "features/ManageDocuments/FormGroup/DocumentClassification";
import DocumentContent from "features/ManageDocuments/FormGroup/DocumentContent";
import DocumentProperty from "features/ManageDocuments/FormGroup/DocumentProperty";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

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
  const { slug } = useParams();
  const property = useSelector(getProperty);
  const relatedDocuments = useSelector(getRelatedDocuments);
  const participants = useSelector(getParticipants);
  const files = useSelector(getFiles);

  React.useEffect(() => {
    if (slug) {
      form.setFieldsValue({
        //property
        typesOfDocument: property?.typesOfDocument?.value,
        category: property?.category?.value,
        agency: property?.agency?.value,
        //classification
        urgentLevel: property?.urgentLevel?.value,
        documentNumber: property?.documentNumber,
        issueDate: dayjs(property?.issueDate),
        signer: property?.signer,
        //content
        title: property?.title,
        content: property?.content,
        summary: property?.summary,

        relatedDocuments: relatedDocuments,
        participants: participants,
      });
      setDocumentFrom(files?.length > 0 ? dataRadio[0].value : dataRadio[1].value);
      console.log("🚀 :: files?.length", files?.length);
      setFileList(
        files?.map((file) => ({
          uid: uuid(),
          name: file.originalName,
          status: "done",
          url: file.location,
        }))
      );
    }
  }, [slug, form, property, relatedDocuments, participants, files]);

  // Document Classification
  const [typesOfDocument, setTypesOfDocument] = React.useState();
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
  const [documentFrom, setDocumentFrom] = React.useState(
    formValues?.documentFrom || files?.length > 0 ? dataRadio[0].value : dataRadio[1].value
  );
  const [titleDocument, setTitleDocument] = React.useState();
  //option one
  const [summaryDocument, setSummaryDocument] = React.useState();
  //option two
  const [contentDocument, setContentDocument] = React.useState();

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
