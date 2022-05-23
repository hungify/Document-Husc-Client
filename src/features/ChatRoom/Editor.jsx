import { Button, Form, Input } from "antd";

const Editor = ({ onChange, onSubmit, value }) => (
  <>
    <Form.Item>
      <Input.TextArea
        rows={4}
        onChange={onChange}
        value={value}
        placeholder="Nhập vào thông tin phản hồi"
      />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Gửi phản hồi
      </Button>
    </Form.Item>
  </>
);

export default Editor;
