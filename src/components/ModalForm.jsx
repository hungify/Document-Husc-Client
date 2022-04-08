import { Form, message, Modal } from "antd";
import React from "react";

export default function ModalForm(props) {
  const { visible, onCreate, onCancel, children } = props;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  
  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue(props.initialValues);
    }
  }, [visible]);

  return (
    <Modal
      {...props}
      visible={visible}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setConfirmLoading(true);
            message.loading({ content: "Đang cập nhật...", key: "updatable" });
            setTimeout(() => {
              setConfirmLoading(false);
              message.success({ content: "Cập nhật thành công", key: "updatable", duration: 2 });
              form.resetFields();
              onCreate(values);
            }, 2000);
          })
          .catch((info) => {
            message.error({ content: "Opps. Đã xảy ra lỗi", key: "updatable" });
          });
      }}
    >
      <Form
        form={form}
        size={props.size}
        layout={props.layout}
        name={props.name}
        wrapperCol={props.wrapperCol}
      >
        {children}
      </Form>
    </Modal>
  );
}
