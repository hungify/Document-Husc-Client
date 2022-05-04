import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { getDocuments } from "app/selectors/documents";
import ListDocument from "components/DocumentList";
import HeaderListDocument from "components/HeaderListDocument";
import ModalForm from "components/ModalForm";
import SearchGroup from "features/SearchGroup/SearchGroup";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`
  background-color: rgba(248, 250, 252, 1);
`;

export default function ManageDocuments() {
  const [visible, setVisible] = React.useState(false);
  const documents = useSelector(getDocuments);

  const navigate = useNavigate();

  const handleRevokeDocumentClick = (item) => {
    setVisible(true);
  };

  const handleEditDocumentClick = (item) => {
    navigate(`edit/${item.key}`);
  };

  const handleOnSubmit = (values) => {
    console.log(values);
    setVisible(false);
  };
  return (
    <Wrapper>
      <ModalForm
        visible={visible}
        onSubmit={handleOnSubmit}
        onCancel={() => setVisible(false)}
        size="large"
        title="Thu hồi văn bản"
        okText="Thu hồi"
        cancelText="Hủy"
        layout="vertical"
        name="revoke-document-form"
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 22, offset: 1 },
          md: { span: 20, offset: 2 },
        }}
      >
        <Form.Item
          name="agency_description"
          label="Lý do"
          tooltip={{ title: "Lý do thu hồi văn bản?", icon: <InfoCircleOutlined /> }}
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <Input.TextArea
            placeholder="Vui lòng mô tả lý do thu hồi văn bản"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
      </ModalForm>
      <SearchGroup />
      <HeaderListDocument>
        <ListDocument
          dataRender={documents}
          onEditDocument={handleEditDocumentClick}
          onRevokeDocument={handleRevokeDocumentClick}
        />
      </HeaderListDocument>
    </Wrapper>
  );
}
