import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import ModalForm from "features/Manage/components/ModalForm/ModalForm";
import React from "react";

export default function AddEditAgency({ visible, onCreate, onCancel, agencyId }) {
  return (
    <ModalForm
      visible={visible}
      onCreate={onCreate}
      onCancel={onCancel}
      agencyId={agencyId}
      size="large"
      title={agencyId ? "Cập nhật thông tin cơ quan" : "Thêm mới cơ quan"}
      okText={agencyId ? "Cập nhật" : "Thêm mới"}
      cancelText={agencyId ? "Hủy" : "Đóng"}
      layout="vertical"
      initialValues={
        agencyId
          ? {
              agency_name: "Đại học khoa học Huế",
              agency_description: "lorem ipsum dolor sit amet",
            }
          : null
      }
      name="agency"
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 22, offset: 1 },
        md: { span: 20, offset: 2 },
      }}
    >
      <Form.Item
        initialValues={agencyId ? "Đại học khoa học Huế" : null}
        name={"agency_name"}
        label="Tên cơ quan"
        tooltip={{ title: "Tên cơ quan ban hành của bạn?", icon: <InfoCircleOutlined /> }}
        rules={[{ required: true, message: "Trường này là bắt buộc" }]}
      >
        <Input placeholder="Vui lòng nhập vào cơ quan ban hành" />
      </Form.Item>
      <Form.Item
        name={"agency_description"}
        label="Mô tả"
        initialValues={agencyId ? "lorem ipsum dolor sit amet" : null}
        tooltip={{ title: "Mô tả về cơ quan ban hành của ban?", icon: <InfoCircleOutlined /> }}
      >
        <Input.TextArea
          placeholder="Vui lòng nhập vào mô tả của cơ quan ban hành"
          requiredMark={"optional"}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
    </ModalForm>
  );
}
