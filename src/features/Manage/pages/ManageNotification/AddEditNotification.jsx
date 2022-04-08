import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, TreeSelect } from "antd";
import RichEditor from "components/RichEditor";
import TreeSelectForm from "components/TreeSelectForm";
import { treePeople } from "config/sidebar";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 8px 10px;
`;
const WrapForm = styled.div`
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 40px rgb(0 0 0 / 16%);
  border-radius: 12px;
`;
export default function AddEditNotification() {
  const [form] = Form.useForm();
  const handleOnSubmit = (values) => {};
  const handleTreeReceiverSelect = (value) => {};
  return (
    <Wrapper>
      <Row>
        <Col span={20} offset={2}>
          <WrapForm>
            <Form layout="vertical" onFinish={handleOnSubmit} form={form}>
              <Form.Item
                label="Người nhận"
                name="receiver"
                tooltip={{
                  title: "Ai sẽ là người nhận được thông báo của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
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
                label="Nội dung"
                name="content"
                tooltip={{
                  title: "Nội dung thông báo của bạn?",
                  icon: <InfoCircleOutlined />,
                }}
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              >
                <RichEditor />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </WrapForm>
        </Col>
      </Row>
    </Wrapper>
  );
}
