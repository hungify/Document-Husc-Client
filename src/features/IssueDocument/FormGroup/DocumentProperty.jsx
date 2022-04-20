import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, DatePicker, Form, Input, Row, Typography } from "antd";
import SelectForm from "components/SelectForm";
import { selectConfig } from "configs/select";
import styled from "styled-components";

const FormItemAnt = styled(Form.Item)`
  padding-left: 20px;
`;
export default function DocumentProperty(props) {
  const {
    onUrgentLevelSelect,
    urgentLevelSelected,
    issuedDate,
    onIssuedDateChange,
    signerDocument,
    onSignerDocumentChange,
    documentNumber,
    onDocumentNumberChange,
    required,
  } = props;

  return (
    <>
      <Row justify="space-between">
        <Col span={10}>
          <FormItemAnt
            name="documentNumber"
            label={<Typography.Text strong>Số hiệu văn bản</Typography.Text>}
            rules={[{ required: required, message: "Trường này là bắt buộc" }]}
            tooltip={{
              title: "Số hiệu văn bản của bạn?",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              placeholder="Nhập vào số hiệu văn bản"
              size="large"
              value={documentNumber}
              onChange={onDocumentNumberChange}
            />
          </FormItemAnt>
        </Col>
        <Col span={6}>
          <FormItemAnt
            label={<Typography.Text strong>Độ khẩn</Typography.Text>}
            name="urgentLevel"
            rules={[{ required: required, message: "Trường này là bắt buộc" }]}
            tooltip={{
              title: "Độ khẩn cấp của văn bản của bạn?",
              icon: <InfoCircleOutlined />,
            }}
          >
            <SelectForm
              hasTag={1}
              showSearch={true}
              onSelect={onUrgentLevelSelect}
              selectData={selectConfig.urgentLevel}
              size="large"
              placeholder="Chọn đổ khẩn của văn bản"
            />
          </FormItemAnt>
        </Col>

        <Col span={8}>
          <FormItemAnt
            label={<Typography.Text strong>Ngày ban hành</Typography.Text>}
            name="dateIssued"
            rules={[{ required: required, message: "Trường này là bắt buộc" }]}
            tooltip={{
              title: "Ngày ban hành văn bản của bạn?",
              icon: <InfoCircleOutlined />,
            }}
          >
            <DatePicker
              format="DD/MM/YYYY"
              onChange={onIssuedDateChange}
              placeholder="Chọn ngày ban hành"
              size="large"
              value={issuedDate}
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
            rules={[{ required: required, message: "Trường này là bắt buộc" }]}
            tooltip={{
              title: "Người kí văn bản của bạn?",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              placeholder="Nhập vào người kí văn bản"
              size="large"
              value={signerDocument}
              onChange={onSignerDocumentChange}
            />
          </FormItemAnt>
        </Col>
      </Row>
    </>
  );
}
