import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Row,
  Space,
  Tag,
  TreeSelect,
  Typography,
  Upload,
} from "antd";
import RichEditor from "components/RichEditor";
import SelectForm from "components/SelectForm";
import TableTransfer from "components/TransferTable";
import TreeSelectForm from "components/TreeSelectForm";
import { selectConfig } from "configs/select";
import { categories } from "configs/sidebar";
import { treePeople } from "configs/trees";
import RecipientTable from "features/IssueDocument/components/RecipientTable";
import RelatedDocumentsTable from "features/IssueDocument/components/RelatedDocumentsTable";
import ResultMessage from "features/IssueDocument/components/ResultMessage";
import React from "react";
import styled from "styled-components";

const FormItemAnt = styled(Form.Item)`
  padding-left: 20px;
`;

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

export default function FormIssueDocument({ form, onSubmitForm, formValues }) {
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

  const handleCategoriesSelect = (value, info) => {
    if (categories.length > 0) {
      setCategoriesSelected([...categories, value]);
    } else {
      setCategoriesSelected([value]);
    }
  };
  const handleCategoriesDeSelect = (value, info) => {
    if (value) {
      setCategoriesSelected(categories.filter((item) => item !== value));
    }
  };

  const handleSelectUrgencyChange = (value) => {
    setUrgencySelected(value);
  };

  const onFinish = (values) => {
    onSubmitForm(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeDocumentType = (value) => {
    setDocumentType(value);
  };

  const handleChangeAgency = (value) => {
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
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <>
        <CardAnt title={<Typography.Text strong>Thông tin phân loại văn bản</Typography.Text>}>
          <Row>
            <Col span={7}>
              <FormItemAnt
                label={<Typography.Text strong>Loại văn bản</Typography.Text>}
                name="documentType"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                tooltip={{
                  title: "Loại văn bản của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <SelectForm
                  selectData={selectConfig.typesOfDocuments}
                  onSelectChange={handleChangeDocumentType}
                  placeholder="Chọn loại văn bản"
                  size="large"
                  showSearch
                  filterOption={false}
                  notFoundContent={true}
                  allowClear
                />
              </FormItemAnt>
            </Col>
            <Col span={10}>
              <FormItemAnt
                label={<Typography.Text strong>Chuyên mục</Typography.Text>}
                name="categories"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                tooltip={{
                  title: "Chuyên mục văn bản của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <TreeSelectForm
                  treeData={categories.data}
                  onTreeSelect={handleCategoriesSelect}
                  onTreeDeSelect={handleCategoriesDeSelect}
                  placeholder="Chọn chuyên mục"
                  allowClear
                  size="large"
                  showCheckedStrategy={TreeSelect.SHOW_PARENT}
                />
              </FormItemAnt>
            </Col>
            <Col span={7}>
              <FormItemAnt
                label={<Typography.Text strong>Cơ quan ban hành</Typography.Text>}
                name="agencies"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                tooltip={{
                  title: "Cơ quan ban hành văn bản của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <SelectForm
                  selectData={selectConfig.agencies}
                  onSelectChange={handleChangeAgency}
                  selectedKeys={agenciesSelected}
                  placeholder="Chọn cơ quan ban hành"
                  size="large"
                  filterOption={false}
                  notFoundContent={true}
                  allowClear
                />
              </FormItemAnt>
            </Col>
          </Row>
        </CardAnt>

        <CardAnt title={<Typography.Text strong>Thuộc tính của văn bản</Typography.Text>}>
          <Row justify="space-between">
            <Col span={10}>
              <FormItemAnt
                name="textNumber"
                label={<Typography.Text strong>Số hiệu văn bản</Typography.Text>}
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                tooltip={{
                  title: "Số hiệu văn bản của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="Nhập vào số hiệu văn bản" size="large" />
              </FormItemAnt>
            </Col>
            <Col span={6}>
              <FormItemAnt
                label={<Typography.Text strong>Độ khẩn</Typography.Text>}
                name="level"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                tooltip={{
                  title: "Độ khẩn cấp của văn bản của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <SelectForm
                  hasTag={1}
                  selectedKey={urgencySelected}
                  onSelectChange={handleSelectUrgencyChange}
                  selectData={selectConfig.urgency}
                  size="large"
                  placeholder="Chọn đổ khẩn của văn bản"
                />
              </FormItemAnt>
            </Col>

            <Col span={8}>
              <FormItemAnt
                label={<Typography.Text strong>Ngày ban hành</Typography.Text>}
                name="publishDate"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                tooltip={{
                  title: "Ngày ban hành văn bản của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày ban hành"
                  size="large"
                  value={new Date()}
                  style={{ width: "100%" }}
                />
              </FormItemAnt>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItemAnt
                label={<Typography.Text strong>Người ký</Typography.Text>}
                name="signer"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                tooltip={{
                  title: "Người kí văn bản của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="Nhập vào người kí văn bản" size="large" />
              </FormItemAnt>
            </Col>
          </Row>
        </CardAnt>
        <CardAnt title={<Typography.Text strong>Nội dung của văn bản</Typography.Text>}>
          <Row>
            <Col span={4}>
              <FormItemAnt
                label={<Typography.Text strong>Văn bản tải lên</Typography.Text>}
                name="documentFrom"
                initialValue={documentFrom}
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                tooltip={{
                  title: "Văn bản của bạn được tải lên từ đâu?",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Radio.Group onChange={handleRadioDocumentFromChange} value={documentFrom}>
                  {dataRadio.map((item, index) => (
                    <Radio value={item.value} key={item.value}>
                      {item.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </FormItemAnt>
            </Col>
            <Col span={20}>
              <FormItemAnt
                name="title"
                label={<Typography.Text strong>Tiêu đề</Typography.Text>}
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                tooltip={{
                  title: "Tiêu đề văn bản của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="Nhập vào tiêu đề của văn bản" size="large" />
              </FormItemAnt>
            </Col>
          </Row>
          <Row>
            {documentFrom === "attach" ? (
              <>
                <Col span={4}>
                  <FormItemAnt
                    label={<Typography.Text strong>Văn bản đính kèm</Typography.Text>}
                    name="files"
                    rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                    tooltip={{
                      title: "Các tệp văn bản của bạn?",
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <Upload
                      action={"http://localhost:3000/"}
                      multiple
                      fileList={fileList}
                      showUploadList={{
                        previewIcon: true,
                        showPreviewIcon: true,
                      }}
                      onChange={handleUploadFileChange}
                      beforeUpload={handleBeforeUploadFile}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </FormItemAnt>
                </Col>
                <Col span={20}>
                  {documentFrom === "attach" && (
                    <FormItemAnt
                      label={<Typography.Text strong>Tóm tắt</Typography.Text>}
                      name="summary"
                      tooltip={{
                        title: "Tóm tắt nhanh văn bản của bạn?",
                        icon: <InfoCircleOutlined />,
                      }}
                    >
                      <Input.TextArea
                        value={summaryValue}
                        onChange={handleSummaryChange}
                        placeholder="Nhập vào tóm tắt của văn bản"
                        autoSize={{ minRows: 3, maxRows: 6 }}
                      />
                    </FormItemAnt>
                  )}
                </Col>
              </>
            ) : (
              <Col span={24}>
                <FormItemAnt
                  label={<Typography.Text strong>Nội dung</Typography.Text>}
                  name="content"
                  rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                >
                  <RichEditor />
                </FormItemAnt>
              </Col>
            )}
          </Row>
        </CardAnt>
        <CardAnt title={<Typography.Text strong>Văn bản liên quan</Typography.Text>}>
          <Row>
            <Col span={24}>
              <RelatedDocumentsTable />
            </Col>
          </Row>
        </CardAnt>
      </>
    </Form>
  );
}
