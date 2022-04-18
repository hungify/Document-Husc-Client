import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, Row, Typography, Upload } from "antd";
import RadioGroup from "components/RadioGroup";
import RichEditor from "components/RichEditor";
import React from "react";
import styled from "styled-components";

const FormItemAnt = styled(Form.Item)`
  padding-left: 20px;
`;
const defaultFileList = [
  {
    uid: "1",
    name: "xxx.pdf",
    status: "done",
    response: "Server Error 500", // custom error message to show
  },
  {
    uid: "2",
    name: "yyy.pdf",
    status: "done",
  },
  {
    uid: "3",
    name: "zzz.pdf",
    status: "error",
    response: "Server Error 500", // custom error message to show
  },
];

export default function DocumentContent(props) {
  const { documentFrom, dataRadio, onRadioDocumentFromChange, summaryValue, handleSummaryChange } =
    props;

  const [fileList, setFileList] = React.useState(defaultFileList);
  const handleUploadFileChange = (info) => {};
  const handleBeforeUploadFile = (file) => {
    return true;
  };
  return (
    <>
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
            <RadioGroup
              dataRadio={dataRadio}
              onRadioChange={onRadioDocumentFromChange}
              valueRadio={documentFrom}
            />
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
                  multiple
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  fileList={fileList}
                  defaultFileList={fileList}
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
              <Input.TextArea
                value={summaryValue}
                onChange={handleSummaryChange}
                placeholder="Nhập vào tóm tắt của văn bản"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </FormItemAnt>
          </Col>
        )}
      </Row>
    </>
  );
}
