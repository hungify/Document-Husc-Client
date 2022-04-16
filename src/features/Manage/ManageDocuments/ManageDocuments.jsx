import { InfoCircleOutlined, PlusCircleTwoTone } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import ListDocument from "components/DocumentList";
import ModalForm from "components/ModalForm";
import HeaderListDocument from "components/HeaderListDocument";
import SearchGroup from "features/SearchGroup/SearchGroup";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`
  background-color: rgba(248, 250, 252, 1);
`;
const WrapButton = styled.div`
  padding: 20px;
  padding-bottom: 0;
`;

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    id: new Date().getTime() + i,
    title: `21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025`,
    avatar: "Admin",
    textNumber: "21/NQ-HĐĐH",
    signer: "Nguyễn Vũ Quốc Huy",
    dateIssued: "2020-05-01",
    authorityIssuing: "Đại Học Huế",
    urgency: "Bình thường",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

export default function ManageDocuments() {
  const [visible, setVisible] = React.useState(false);

  const navigate = useNavigate();

  const handleRevokeDocumentClick = (item) => {
    setVisible(true);
  };

  const handleEditDocumentClick = (item) => {
    navigate(`edit/${item.id}`);
  };

  const handleCreateDocumentClick = () => {
    navigate("post");
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
      <WrapButton>
        <Button
          icon={<PlusCircleTwoTone />}
          size="large"
          type="primary"
          onClick={handleCreateDocumentClick}
        >
          Ban hành văn bản
        </Button>
      </WrapButton>
      <HeaderListDocument>
        <ListDocument
          dataRender={listData}
          onEditDocument={handleEditDocumentClick}
          onRevokeDocument={handleRevokeDocumentClick}
        />
      </HeaderListDocument>
    </Wrapper>
  );
}
