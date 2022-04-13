import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, TreeSelect } from "antd";
import ModalForm from "components/ModalForm";
import TreeSelectForm from "components/TreeSelectForm";
import { treePeople } from "configs/sidebar";
import React from "react";
export default function MailBox({ visible, onCreate, onCancel, documentTypeId }) {
  const [treeReceiver, setTreeReceiver] = React.useState();
  const handleTreeReceiverSelect = (value) => {
    setTreeReceiver([...treeReceiver, value]);
  };
  return (
    <ModalForm
      visible={visible}
      onCreate={onCreate}
      onCancel={onCancel}
      size="large"
      title={"Chuyển tiếp văn bản"}
      okText={"Chuyển tiếp"}
      cancelText={"Hủy"}
      layout="vertical"
      initialValues={{
        document_type_name: documentTypeId ? "Quyết định" : null,
        document_type_description: documentTypeId ? "lorem ipsum dolor sit amet" : null,
      }}
      name="forward"
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 22, offset: 1 },
        md: { span: 20, offset: 2 },
      }}
    >
      <Form.Item
        name="to"
        label="Người nhận"
        tooltip={{ title: "Người nhận văn bản của bạn?", icon: <InfoCircleOutlined /> }}
        rules={[{ required: true, message: "Trường này là bắt buộc" }]}
      >
        <TreeSelectForm
          treeData={treePeople}
          onTreeSelect={handleTreeReceiverSelect}
          placeholder="Chọn người nhận"
          allowClear
          size="large"
          showCheckedStrategy={TreeSelect.SHOW_PARENT}
          treeCheckable={true}
        />
      </Form.Item>
      <Form.Item
        name="message"
        label="Nội dung"
        tooltip={{ title: "Nội dung của ban?", icon: <InfoCircleOutlined /> }}
      >
        <Input.TextArea
          placeholder="Vui lòng nhập vào nội dung"
          requiredMark={"optional"}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
    </ModalForm>
  );
}
