import { InboxOutlined, InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Radio, Row, Typography, Upload } from "antd";
import RadioGroup from "components/RadioGroup";
import React from "react";
import styled from "styled-components";

const FormItemAnt = styled(Form.Item)`
  padding-left: 20px;
`;

export default function DocumentContent(props) {
  const {
    dataRadio,
    documentFrom,
    onDocumentFromChange,
    // titleDocument,
    // onTitleDocumentChange,
    // summaryValue,
    // handleSummaryChange,
    // onContentDocumentChange,
    // contentDocument,
    required,
  } = props;

  const [fileList, setFileList] = React.useState([]);
  return (
    <>
      <Row>
        <Col span={4}>
          <FormItemAnt
            label={<Typography.Text strong>Văn bản tải lên</Typography.Text>}
            name="documentFrom"
            rules={[{ required: required, message: "Trường này là bắt buộc" }]}
            tooltip={{
              title: "Văn bản của bạn được tải lên từ đâu?",
              icon: <InfoCircleOutlined />,
            }}
            initialValue={documentFrom} // must have
          >
            <RadioGroup
              dataRadio={dataRadio}
              onChange={onDocumentFromChange}
              value={documentFrom}
            />
          </FormItemAnt>
        </Col>
        <Col span={20}>
          <FormItemAnt
            name="title"
            initialValue="Test title"
            label={<Typography.Text strong>Tiêu đề</Typography.Text>}
            rules={[{ required: required, message: "Trường này là bắt buộc" }]}
            tooltip={{
              title: "Tiêu đề văn bản của bạn?",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              placeholder="Nhập vào tiêu đề của văn bản"
              size="large"
              // value={titleDocument}
              // onChange={onTitleDocumentChange}
            />
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
                rules={[{ required: required, message: "Trường này là bắt buộc" }]}
                tooltip={{
                  title: "Các tệp văn bản của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Upload.Dragger
                  multiple
                  beforeUpload={(file, fileList) => {
                    setFileList([...fileList, file]);
                    return false;
                  }}
                  onRemove={(file) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    setFileList(newFileList);
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company
                    data or other band files
                  </p>
                </Upload.Dragger>
                {/* <Upload
                  multiple
                  beforeUpload={(file, fileList) => {
                    setFileList([...fileList, file]);
                    return false;
                  }}
                  onRemove={(file) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    setFileList(newFileList);
                  }}
                >
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload> */}
              </FormItemAnt>
            </Col>
            <Col span={20}>
              {documentFrom === "attach" && (
                <FormItemAnt
                  label={<Typography.Text strong>Tóm tắt</Typography.Text>}
                  name="summary"
                  initialValue="Test summary"
                  tooltip={{
                    title: "Tóm tắt nhanh văn bản của bạn?",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Input.TextArea
                    // value={summaryValue}
                    // onChange={handleSummaryChange}
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
              initialValue="Test content"
              name="content"
              rules={[{ required: required, message: "Trường này là bắt buộc" }]}
            >
              <Input.TextArea
                // value={contentDocument}
                // onChange={onContentDocumentChange}
                placeholder="Nhập vào nội dung của văn bản"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </FormItemAnt>
          </Col>
        )}
      </Row>
    </>
  );
}
