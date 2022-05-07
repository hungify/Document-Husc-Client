import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import ModalForm from "components/ModalForm";
import React from "react";

export default function AddEditDepartments({ visible, onSubmit, onCancel, department }) {
  return (
    <ModalForm
      visible={visible}
      onSubmit={onSubmit}
      onCancel={onCancel}
      size="large"
      title={department ? "Cập nhật thông tin phong/ban" : "Thêm mới phong/ban"}
      okText={department ? "Cập nhật" : "Thêm mới"}
      cancelText={department ? "Hủy" : "Đóng"}
      layout="vertical"
      initialValues={{
        label: department ? department.label : "",
      }}
      name="department"
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 22, offset: 1 },
        md: { span: 20, offset: 2 },
      }}
    >
      <Form.Item
        name="label"
        label="Tên phòng/ban"
        tooltip={{ title: "Tên phòng/ban của bạn", icon: <InfoCircleOutlined /> }}
        rules={[{ required: true, message: "Trường này là bắt buộc" }]}
      >
        <Input placeholder="Nhập vào tên phòng/ban" />
      </Form.Item>
    </ModalForm>
  );
}
