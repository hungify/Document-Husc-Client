import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, message, Row, TreeSelect, Upload } from "antd";
import DebounceSelect from "components/DebounceSelect";
import SelectForm from "components/SelectForm";
import TreeSelectForm from "components/TreeSelectForm";
import { selectConfig } from "configs/select";
import { categories } from "configs/sidebar";
import { treePeople } from "configs/trees";
import React from "react";
import styled from "styled-components";

const FormItemAnt = styled(Form.Item)`
  padding-left: 20px;
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

export default function CreateDocument({ form, onSubmitForm, formValues }) {
  const [treeData, setTreeData] = React.useState(treePeople);
  const [receiverSelected, setReceiverSelected] = React.useState(
    formValues?.receiver ? [formValues?.receiver] : []
  );

  const [statusSelected, setStatusSelected] = React.useState(formValues?.status);
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

  return (
    <Form name="basic" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Card>
        <Row>
          <Col span={12}>
            <FormItemAnt
              label="Loại văn bản"
              name="documentType"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Loại văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <SelectForm
                data={selectConfig.document}
                onSelectChange={handleChangeDocumentType}
                placeholder="Chọn loại văn bản"
                size="large"
                showSearch
                filterOption={false}
                notFoundContent={true}
                allowClear
                document={1}
              />
            </FormItemAnt>
          </Col>

          <Col span={12}>
            <FormItemAnt
              label="Cơ quan ban hành"
              name="agencies"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Cơ quan ban hành văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <SelectForm
                data={selectConfig.agency}
                onSelectChange={handleChangeAgency}
                placeholder="Chọn cơ quan ban hành"
                size="large"
                showSearch
                filterOption={false}
                notFoundContent={true}
                allowClear
                document={1}
              />
            </FormItemAnt>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItemAnt
              label="Chuyên mục"
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
                treeCheckable={true}
              />
            </FormItemAnt>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <FormItemAnt
              label="Người nhận"
              name="receiver"
              tooltip={{
                title: "Ai sẽ là người nhận được văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
            >
              <TreeSelectForm
                treeData={treeData}
                onTreeDeSelect={handleTreeReceiverDeSelect}
                onTreeSelect={handleTreeReceiverSelect}
                placeholder="Chọn người nhận"
                allowClear
                size="large"
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                treeCheckable={true}
              />
            </FormItemAnt>
          </Col>
        </Row>
      </Card>

      <Card>
        <Row justify="space-between">
          <Col span={10}>
            <FormItemAnt
              name="textNumber"
              label="Số hiệu văn bản"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Số hiệu văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="Ex: 26/NQ-HĐĐH" size="large" />
            </FormItemAnt>
          </Col>
          <Col flex="auto">
            <FormItemAnt
              label="Độ khẩn"
              name="level"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Độ khẩn cấp của văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <SelectForm
                value={urgencySelected}
                onSelectChange={handleSelectUrgencyChange}
                data={selectConfig.urgency}
                size="large"
                placeholder="Chọn đổ khẩn của văn bản"
              />
            </FormItemAnt>
          </Col>

          <Col flex="auto">
            <FormItemAnt
              label="Ngày ban hành"
              name="publishDate"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Ngày ban hành văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <DatePicker format="DD/MM/YYYY" placeholder="Ex: 10/02/2021" size="large" />
            </FormItemAnt>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItemAnt
              label="Người ký"
              name="signer"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Người kí văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="Ex: Huỳnh Văn Chương" size="large" />
            </FormItemAnt>
          </Col>
        </Row>
      </Card>
      <Card>
        <Row>
          <Col span={24}>
            <FormItemAnt
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Tiêu đề văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="Ex:Biên bản nghiệm thu và thanh lý đề tài" size="large" />
            </FormItemAnt>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItemAnt
              label="Tóm tắt"
              name="summary"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Tóm tắt nhanh văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input.TextArea
                value={summaryValue}
                onChange={handleSummaryChange}
                placeholder="Ex: 26/NQ-HĐĐH : Nghị quyết về việc phê duyệt Đề án thành lập Trung tâm Khảo thí - Đại học Huế"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </FormItemAnt>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItemAnt
              name="relativeDocument"
              label="Văn bản liên quan"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Văn bản liên quan đến văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <DebounceSelect
                mode="multiple"
                value={value}
                clearIcon={true}
                size="large"
                placeholder="Chọn các bản văn liên quan"
                fetchOptions={fetchUserList}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </FormItemAnt>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItemAnt
              label="Tệp đính kèm"
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
        </Row>
      </Card>
    </Form>
  );
}
