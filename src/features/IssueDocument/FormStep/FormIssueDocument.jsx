import { Card, Form, message, Typography } from "antd";
import { treePeople } from "configs/trees";
import RelatedDocuments from "features/IssueDocument/components/RelatedDocuments";
import DocumentContent from "features/IssueDocument/FormGroup/DocumentContent";
import DocumentClassification from "features/IssueDocument/FormGroup/DocumentClassification";
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

async function fetchUserList(username) {
  console.log("fetching user", username);
  return fetch("https://randomuser.me/api/?results=5")
    .then((response) => response.json())
    .then((body) =>
      body.results.map((user) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      }))
    );
}

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
  onSelectRelatedDocument,
  selectedRelatedDocument,
}) {
  const [treeData, setTreeData] = React.useState(treePeople);
  const [receiverSelected, setReceiverSelected] = React.useState(
    formValues?.receiver ? [formValues?.receiver] : []
  );

  const [documentFrom, setDocumentFrom] = React.useState(dataRadio[0].value);

  const [urgencySelected, setUrgencySelected] = React.useState(formValues?.urgency);

  const [agenciesSelected, setAgencySelected] = React.useState();
  const [documentType, setDocumentType] = React.useState("");
  const [categoriesSelected, setCategoriesSelected] = React.useState([]);

  const [summaryValue, setSummaryValue] = React.useState("");
  const [fileList, setFileList] = React.useState([]);
  const [value, setValue] = React.useState([]);

  const handleTreeReceiverSelect = (value, info) => {
    if (receiverSelected.length > 0) {
      setReceiverSelected([...receiverSelected, value]);
    } else {
      setReceiverSelected([value]);
    }
  };

  const handleTreeReceiverDeSelect = (value, info) => {
    if (value) {
      setReceiverSelected(receiverSelected.filter((item) => item !== value));
    }
  };

  const handleUrgencySelect = (value) => {
    setUrgencySelected(value);
  };

  const onFinish = (values) => {
    onSubmitForm(values);
  };

  const handleSelectTypesOfDocument = (value) => {
    setDocumentType(value);
  };

  const handleSelectAgency = (value) => {
    setAgencySelected(value);
  };

  const handleSummaryChange = (value) => {
    setSummaryValue(value);
  };

  const handleUploadFileChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleBeforeUploadFile = (file) => {
    console.log("🚀 :: file", file);
  };

  const handleRadioDocumentFromChange = (e) => {
    setDocumentFrom(e.target.value);
  };

  return (
    <Form
      name="issue-document"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onSubmitFailed}
      layout="vertical"
    >
      <CardAnt title={<Typography.Text strong>Thông tin phân loại văn bản</Typography.Text>}>
        <DocumentClassification
          onTreeDeSelect={handleTreeReceiverDeSelect}
          onTreeSelect={handleTreeReceiverSelect}
          onSelectTypesOfDocument={handleSelectTypesOfDocument}
          onAgencySelect={handleSelectAgency}
          agenciesSelected={agenciesSelected}
        />
      </CardAnt>

      <CardAnt title={<Typography.Text strong>Thuộc tính của văn bản</Typography.Text>}>
        <DocumentProperty onUrgencySelect={handleUrgencySelect} urgencySelected={urgencySelected} />
      </CardAnt>

      <CardAnt title={<Typography.Text strong>Nội dung của văn bản</Typography.Text>}>
        <DocumentContent
          documentFrom={documentFrom}
          dataRadio={dataRadio}
          onRadioDocumentFromChange={handleRadioDocumentFromChange}
          summaryValue={summaryValue}
          onSummaryChange={handleSummaryChange}
        />
      </CardAnt>
      <CardAnt title={<Typography.Text strong>Văn bản liên quan</Typography.Text>}>
        <RelatedDocuments
          onSelectRelatedDocument={onSelectRelatedDocument}
          selectedRelatedDocument={selectedRelatedDocument}
        />
      </CardAnt>
    </Form>
  );
}
