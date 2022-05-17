import { InboxOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Col, Form, Input, message, Row, Typography, Upload } from "antd";
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

    titleDocument,
    onTitleDocumentChange,
    summaryValue,
    onSummaryChange,
    contentDocument,
    onContentDocumentChange,
    fileList,
    setFileList,
    required,
  } = props;

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
            <RadioGroup dataRadio={dataRadio} onChange={onDocumentFromChange} />
          </FormItemAnt>
        </Col>
        <Col span={20}>
          <FormItemAnt
            name="title"
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
              value={titleDocument}
              onChange={onTitleDocumentChange}
              spellCheck={false}
            />
          </FormItemAnt>
        </Col>
      </Row>
      <Row>
        {documentFrom === "attach" ? (
          <>
            <Col span={9}>
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
                  name="files"
                  multiple
                  fileList={fileList}
                  beforeUpload={(file) => {
                    const typesShouldBe = [
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                      "application/msword",
                      "application/pdf",
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                      "application/vnd.ms-excel",
                    ];
                    const isMatch = typesShouldBe.some((type) => file.type === type);

                    if (!isMatch) {
                      message.error(
                        `${file.name} không đúng định dạng, vui lòng chọn tệp văn bản có định dạng là .pdf, .doc, .docx`
                      );
                    } else {
                      setFileList((fileList) => [...fileList, file]);
                    }
                    return false;
                  }}
                  accept=".pdf,.doc,.docx,.xlsx,.xls"
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
                  <p className="ant-upload-text">Kéo thả hoặc click để tải lên</p>
                  <p className="ant-upload-hint">Hỗ trợ định dạng: .pdf, .doc, .docx</p>
                </Upload.Dragger>
              </FormItemAnt>
            </Col>
            <Col span={15}>
              {documentFrom === "attach" && (
                <FormItemAnt
                  label={<Typography.Text strong>Tóm tắt</Typography.Text>}
                  name="summary"
                  tooltip={{
                    title: "Tóm tắt nhanh văn bản của bạn?",
                    icon: <InfoCircleOutlined />,
                  }}
                  initialValue={summaryValue}
                >
                  <Input.TextArea
                    value={summaryValue}
                    onChange={onSummaryChange}
                    placeholder="Nhập vào tóm tắt của văn bản"
                    autoSize={{ minRows: 6, maxRows: 6 }}
                    spellCheck={false}
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
              rules={[{ required: required, message: "Trường này là bắt buộc" }]}
              initialValue={contentDocument}
            >
              <Input.TextArea
                value={contentDocument}
                onChange={onContentDocumentChange}
                placeholder="Nhập vào nội dung của văn bản"
                autoSize={{ minRows: 6, maxRows: 6 }}
                spellCheck={false}
              />
            </FormItemAnt>
          </Col>
        )}
      </Row>
    </>
  );
}
