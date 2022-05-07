import { Form, message, Modal } from "antd";
import React from "react";

export default function ModalForm({
  initialValues,
  visible,
  onSubmit,
  onCancel,
  children,
  ...restProps
}) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, form, initialValues]);

  return (
    <Modal
      {...restProps}
      visible={visible}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setConfirmLoading(true);
            setTimeout(() => {
              setConfirmLoading(false);
              onSubmit(values);
              form.resetFields();
            }, 500);
          })
          .catch((info) => {
            message.error({ content: "Opps. Đã xảy ra lỗi", key: "updatable" });
          });
      }}
    >
      <Form
        form={form}
        size={restProps.size}
        layout={restProps.layout}
        name={restProps.name}
        wrapperCol={restProps.wrapperCol}
      >
        {children}
      </Form>
    </Modal>
  );
}
