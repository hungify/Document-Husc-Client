import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Space,
  Typography,
  Upload,
} from "antd";
import DebounceSelect from "components/DebounceSelect";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 8px 10px;
`;
const FormItemAnt = styled(Form.Item)`
  padding-right: 20px;
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

export default function ThirdStep({ form, onFinish }) {
  const [summaryValue, setSummaryValue] = React.useState("");
  const [fileList, setFileList] = React.useState([]);
  const [value, setValue] = React.useState([]);

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
  const handleUploadFileDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  };

  const handleBeforeUploadFile = (file) => {
    console.log("🚀 :: file", file);
  };

  return (
    <Wrapper>
      <Form onFinish={onFinish} form={form} layout="vertical">
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
              {/* <Upload.Dragger
                accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={handleUploadFileChange}
                onDrop={handleUploadFileDrop}
                multiple
                fileList={fileList}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Di chuyển tệp văn bản vào đây</p>
              </Upload.Dragger> */}
              <Upload
                action={"http://localhost:3000/"}
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
          <Col span={12}>
            <FormItemAnt
              name="pageNumber"
              label="Số trang"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              tooltip={{
                title: "Số trang tệp văn bản của bạn?",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Row>
                <Space size={"small"}>
                  <Col span={24}>
                    <InputNumber
                      addonBefore={<Typography.Text strong>Tệp 1</Typography.Text>}
                      addonAfter="Trang"
                      size="large"
                      min={1}
                      max={30}
                    />
                  </Col>
                  <Col span={24}>
                    <InputNumber
                      addonBefore={<Typography.Text strong>Tệp 2</Typography.Text>}
                      addonAfter="Trang"
                      size="large"
                      min={1}
                      max={30}
                    />
                  </Col>
                </Space>
              </Row>
            </FormItemAnt>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
}
