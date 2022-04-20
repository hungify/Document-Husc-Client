import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import ModalForm from "components/ModalForm";
import React from "react";

export default function AddEditAgencies({ visible, onSubmit, onCancel, agencyId }) {
  return (
    <ModalForm
      visible={visible}
      onSubmit={onSubmit}
      onCancel={onCancel}
      agencyId={agencyId}
      size="large"
      title={agencyId ? "Cập nhật thông tin cơ quan" : "Thêm mới cơ quan"}
      okText={agencyId ? "Cập nhật" : "Thêm mới"}
      cancelText={agencyId ? "Hủy" : "Đóng"}
      layout="vertical"
      initialValues={{
        agency_name: agencyId ? "Đại học khoa học Huế" : null,
        agency_description: agencyId ? "lorem ipsum dolor sit amet" : null,
      }}
      name="agency"
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 22, offset: 1 },
        md: { span: 20, offset: 2 },
      }}
    >
      <Form.Item
        name="agencyName"
        label="Tên cơ quan"
        tooltip={{ title: "Tên cơ quan ban hành của bạn?", icon: <InfoCircleOutlined /> }}
        rules={[{ required: true, message: "Trường này là bắt buộc" }]}
      >
        <Input placeholder="Vui lòng nhập vào cơ quan ban hành" />
      </Form.Item>
    </ModalForm>
  );
}
