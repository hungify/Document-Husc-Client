import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import ModalForm from "components/ModalForm";
import React from "react";

export default function AddEditTypeOfDocument({ visible, onSubmit, onCancel, documentTypeId }) {
  return (
    <ModalForm
      visible={visible}
      onSubmit={onSubmit}
      onCancel={onCancel}
      documentTypeId={documentTypeId}
      size="large"
      title={documentTypeId ? "Cập nhật thông tin loại văn bản" : "Thêm mới loại văn bản"}
      okText={documentTypeId ? "Cập nhật" : "Thêm mới"}
      cancelText={documentTypeId ? "Hủy" : "Đóng"}
      layout="vertical"
      initialValues={{
        document_type_name: documentTypeId ? "Quyết định" : null,
        document_type_description: documentTypeId ? "lorem ipsum dolor sit amet" : null,
      }}
      name="agency"
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 22, offset: 1 },
        md: { span: 20, offset: 2 },
      }}
    >
      <Form.Item
        name="document_type_name"
        label="Tên loại văn bản"
        tooltip={{ title: "Tên loại văn bản của bạn?", icon: <InfoCircleOutlined /> }}
        rules={[{ required: true, message: "Trường này là bắt buộc" }]}
      >
        <Input placeholder="Vui lòng nhập vào tên loại văn bản" />
      </Form.Item>
      <Form.Item
        name="document_type_description"
        label="Mô tả"
        tooltip={{ title: "Mô tả về cơ loại văn bản của ban?", icon: <InfoCircleOutlined /> }}
      >
        <Input.TextArea
          placeholder="Vui lòng nhập vào mô tả loại văn bản"
          requiredMark={"optional"}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
    </ModalForm>
  );
}
